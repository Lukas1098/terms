import { generateText } from "ai";
import { mistral } from "@ai-sdk/mistral";

const model = mistral("mistral-large-latest");
const systemPrompt = `
You are a legal writing assistant.

Your only task is to generate simple Terms & Conditions documents for:
- startups
- apps
- SaaS products
- websites
- side projects
- online services

Rules:
- Only generate Terms & Conditions.
- Do NOT answer general questions.
- Do NOT explain things.
- Do NOT provide advice.
- If the request is unrelated to a product, startup, service, or website, respond with:

"Invalid request. Please provide a product, startup, or service name."

Output requirements:
- Write in clear legal-style English.
- 5–7 sections.
- Use section titles.
- Keep the document concise.
`;

type CoreMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages: CoreMessage[] = Array.isArray(
    (body as { messages?: unknown })?.messages
  )
    ? (body as { messages: CoreMessage[] }).messages.filter(
        (m) =>
          m &&
          typeof m.role === "string" &&
          typeof m.content === "string" &&
          ["user", "assistant", "system"].includes(m.role)
      )
    : [];

  if (messages.length === 0) {
    return Response.json({ error: "No valid messages provided" }, { status: 400 });
  }

  const { text } = await generateText({
    model,
    messages,
    system: systemPrompt,
  });

  return Response.json({ message: text });
}