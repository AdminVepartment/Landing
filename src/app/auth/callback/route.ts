import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has completed onboarding
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("workspace_id")
          .eq("id", user.id)
          .single();

        if (profile?.workspace_id) {
          // Existing user with workspace → dashboard
          return NextResponse.redirect(`${origin}/dashboard`);
        } else {
          // New user or no workspace → onboarding
          return NextResponse.redirect(`${origin}/onboarding/step-1`);
        }
      }

      return NextResponse.redirect(`${origin}/onboarding/step-1`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/signin?error=auth_failed`);
}
