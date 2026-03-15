import { NextRequest, NextResponse } from "next/server";

const CREWAI_URL = process.env.CREWAI_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { command, params } = body as {
    command: string;
    params?: Record<string, string>;
  };

  if (!command?.trim()) {
    return NextResponse.json(
      { output: "No command specified.", success: false, expression: "curious" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${CREWAI_URL}/command`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, params }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { output: `Backend error: ${text.slice(0, 200)}`, success: false, expression: "curious" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({
      output: data.output ?? "Command processed.",
      success: data.success ?? true,
      expression: data.expression ?? "determined",
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        output: `Backend unreachable: ${errorMessage}`,
        success: false,
        expression: "curious",
      },
      { status: 502 },
    );
  }
}
