import { NextResponse } from "next/server";

const CREWAI_URL = process.env.CREWAI_BACKEND_URL || "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(`${CREWAI_URL}/state`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${text.slice(0, 200)}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Backend unreachable: ${errorMessage}` },
      { status: 502 },
    );
  }
}
