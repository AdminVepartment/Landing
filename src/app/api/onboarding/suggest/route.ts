import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_CHAT_WEBHOOK_URL ||
  "https://vepartment.app.n8n.cloud/webhook/50cd53b3-e5dc-40a6-a5c4-e6bde8c0ebab/chat";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { description, type } = body as {
    description: string;
    type: "department" | "domain";
  };

  if (!description?.trim()) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  const departments = [
    "Marketing",
    "Branding",
    "Product",
    "Sales",
    "Sustainability",
    "Operations",
    "Finance",
    "HR / Talent",
  ];

  const domains = [
    "Social & Messaging",
    "Campaign Planning",
    "Content Creation",
    "Performance Analytics",
    "Customer Insights",
    "Trend Analysis",
  ];

  const options = type === "department" ? departments : domains;

  const prompt =
    type === "department"
      ? `The user is setting up their organization on Vepartment (an AI-native operating system for virtual departments). They described their needs as: "${description}"

Based on this, suggest the ONE best matching department from this list: ${options.join(", ")}.

You MUST respond in this exact JSON format only, no other text:
{"suggested": "DepartmentName", "reason": "One sentence explanation of why this department fits their needs."}`
      : `The user is setting up the "${body.department || "Marketing"}" department on Vepartment. They described the workflow they want to run as: "${description}"

Based on this, suggest the ONE best matching domain from this list: ${options.join(", ")}.

You MUST respond in this exact JSON format only, no other text:
{"suggested": "DomainName", "reason": "One sentence explanation of why this domain fits their workflow."}`;

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "sendMessage",
        chatInput: prompt,
        sessionId: `onboarding_${type}_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: "n8n webhook error", details: text },
        { status: response.status }
      );
    }

    // Parse streaming NDJSON response
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

    // Try to parse the AI response as JSON
    try {
      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        // Normalize to single string
        const suggested = Array.isArray(parsed.suggested)
          ? parsed.suggested[0] ?? ""
          : parsed.suggested ?? "";
        return NextResponse.json({
          suggested,
          reason: parsed.reason ?? "",
        });
      }
    } catch {
      // If JSON parsing fails, return the raw text
    }

    return NextResponse.json({
      suggested: "",
      reason: output || "Could not determine a suggestion.",
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to reach n8n", details: errorMessage },
      { status: 502 }
    );
  }
}
