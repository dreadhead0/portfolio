import { json } from "@sveltejs/kit";
import { GROQ_API_KEY } from "$env/static/private";
import { projects, skills } from "$lib/data/projects";

const MODEL = "llama-3.3-70b-versatile";

function buildPortfolioContext() {
  const projectSummary = projects
    .map((project) => {
      return [
        `Title: ${project.title}`,
        `Category: ${project.category}`,
        `Type: ${project.type}`,
        `Description: ${project.description}`,
        `Technologies: ${project.tech.join(", ")}`,
        `GitHub: ${project.github}`,
      ].join("\n");
    })
    .join("\n\n");

  const skillsSummary = Object.entries(skills)
    .map(([group, items]) => `${group}: ${items.join(", ")}`)
    .join("\n");

  return `
PORTFOLIO OWNER:
- Name/handle: dreadhead
- Positioning: Frontend Systems Engineer
- Style: deep-web hacker, futuristic, Apple-level clean, cinematic, developer-terminal inspired
- Recruiter memory targets: real-time systems, frontend architecture, performance, UI polish, accessibility

SKILLS:
${skillsSummary}

PROJECTS:
${projectSummary}
`;
}

export async function POST({ request }) {
  try {
    if (!GROQ_API_KEY) {
      return json(
        { error: "Missing GROQ_API_KEY on the server." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const message = String(body?.message || "").trim();

    if (!message) {
      return json({ error: "Message is required." }, { status: 400 });
    }

    if (message.length > 800) {
      return json(
        { error: "Message is too long. Keep it under 800 characters." },
        { status: 400 },
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.4,
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content: `
You are a concise AI portfolio assistant embedded in dreadhead's developer portfolio.

Rules:
- Answer only about dreadhead's projects, skills, portfolio, contact direction, and engineering strengths.
- Be helpful to recruiters, collaborators, and technical reviewers.
- Keep answers short, confident, and specific.
- Mention relevant projects when useful.
- Do not invent live links beyond the GitHub links provided.
- If asked unrelated questions, politely redirect back to the portfolio.
- Tone: clean, technical, slightly terminal-inspired, not cheesy.
`,
          },
          {
            role: "system",
            content: buildPortfolioContext(),
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);

      return json(
        { error: "The assistant could not connect to Groq right now." },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "I could not generate a response right now.";

    return json({ reply });
  } catch (error) {
    console.error("Assistant route error:", error);

    return json(
      { error: "Something went wrong while generating a response." },
      { status: 500 },
    );
  }
}