import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // ── Public routes — no auth needed ──────────────────────────────
  const publicPaths = ["/", "/landing", "/whitepaper", "/privacy", "/terms", "/design-system"];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isPublic) return supabaseResponse;

  // ── Auth callback — always allow ────────────────────────────────
  if (pathname.startsWith("/auth/callback") || pathname.startsWith("/auth/signout")) {
    return supabaseResponse;
  }

  // ── Not signed in ───────────────────────────────────────────────
  if (!user) {
    // Allow auth pages
    if (pathname.startsWith("/auth")) return supabaseResponse;
    // Redirect everything else to signin
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // ── Signed in — check workspace ─────────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("workspace_id")
    .eq("id", user.id)
    .single();

  const hasWorkspace = !!profile?.workspace_id;

  // Signed in + on auth pages → redirect away
  if (pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = hasWorkspace ? "/dashboard" : "/onboarding/step-1";
    return NextResponse.redirect(url);
  }

  // Signed in + on onboarding
  if (pathname.startsWith("/onboarding")) {
    // Already has workspace and trying to go back to step-1 → skip to step-2 or dashboard
    if (hasWorkspace && pathname === "/onboarding/step-1") {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding/step-2";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Signed in + on dashboard/protected without workspace → onboarding
  if (!hasWorkspace) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding/step-1";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
