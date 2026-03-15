import { NextRequest, NextResponse } from "next/server";

const CREWAI_URL = process.env.CREWAI_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, sessionId } = body as {
    message: string;
    sessionId: string;
  };

  if (!message?.trim()) {
    return NextResponse.json(
      { output: "I didn't catch that. Could you say more?", expression: "curious" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${CREWAI_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { output: `Backend error: ${text.slice(0, 200)}`, expression: "curious" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({
      output: data.output ?? "No response received.",
      expression: data.expression ?? "calm",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        output: `I couldn't reach the backend. Is it running on ${CREWAI_URL}? (${errorMessage})`,
        expression: "curious",
      },
      { status: 502 },
    );
  }
}
