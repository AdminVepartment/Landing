import { NextRequest, NextResponse } from "next/server";

const CREWAI_URL = process.env.CREWAI_BACKEND_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(`${CREWAI_URL}/config`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend error" },
        { status: response.status },
      );
    }
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { error: "Backend unreachable", backendConnected: false },
      { status: 502 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await fetch(`${CREWAI_URL}/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text.slice(0, 200) },
        { status: response.status },
      );
    }
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { error: "Backend unreachable" },
      { status: 502 },
    );
  }
}
