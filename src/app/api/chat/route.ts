import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  "https://vepartment.app.n8n.cloud/webhook/50cd53b3-e5dc-40a6-a5c4-e6bde8c0ebab/chat";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, sessionId } = body as {
    message: string;
    sessionId: string;
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "sendMessage",
        chatInput: message,
        sessionId,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "n8n webhook error", details: text },
        { status: response.status }
      );
    }

    // n8n Chat Trigger returns streaming NDJSON lines
    // Parse all chunks and concatenate the content from "item" events
    const text = await response.text();
    const lines = text.split("\n").filter(Boolean);
    let output = "";

    for (const line of lines) {
      try {
        const event = JSON.parse(line);
        if (event.type === "item" && event.content) {
          output += event.content;
        }
      } catch {
        // skip non-JSON lines
      }
    }

    return NextResponse.json({ output: output || "No response received." });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to reach n8n", details: errorMessage },
      { status: 502 }
    );
  }
}
