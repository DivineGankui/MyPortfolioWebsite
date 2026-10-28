
export default async (request) => {
    // Only accept POST requests
    if (request.method !== "POST") {
        return Response.json(
            { error: "Method not allowed." },
            { status: 405 }
        );
    }

    try {
        // Get the visitor's message
        const { message, history = [] } = await request.json();

        if (
            typeof message !== "string" ||
            !message.trim() ||
            message.length > 2000
        ) {
            return Response.json(
                { error: "Please enter a valid message." },
                { status: 400 }
            );
        }

        // Get the secret API key from Netlify
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return Response.json(
                { error: "AI service is not configured." },
                { status: 500 }
            );
        }

        // Limit conversation history
        const safeHistory = Array.isArray(history)
            ? history.slice(-8).filter(item =>
                ["user", "assistant"].includes(item.role) &&
                typeof item.content === "string"
            )
            : [];

        // Portfolio assistant instructions
        const instructions = `
You are the official AI portfolio assistant for Divine Kojo Gankui.

Your responsibilities:
- Answer questions about Divine, his skills, services and projects.
- Be professional, friendly and conversational.
- Keep answers clear and reasonably concise.
- Help visitors understand his work and how to contact him.
- Do not invent qualifications, clients, projects, prices or experience.
- If you do not know something, politely say so.
- If someone wants to hire Divine, encourage them to use the contact section.

You represent a professional software developer and graphic designer.
Only share personal or professional information that is provided
in the portfolio or conversation context.
        `;

        const response = await fetch(
            "https://api.openai.com/v1/responses",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4.1-mini",
                    instructions,
                    input: [
                        ...safeHistory,
                        {
                            role: "user",
                            content: message.trim()
                        }
                    ],
                    max_output_tokens: 400
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error("OpenAI API error:", result);

            return Response.json(
                { error: "The AI assistant is temporarily unavailable." },
                { status: 502 }
            );
        }

        // Extract generated text
        const answer = (result.output || [])
            .flatMap(item => item.content || [])
            .filter(item => item.type === "output_text")
            .map(item => item.text)
            .join("\n");

        if (!answer) {
            throw new Error("No response generated.");
        }

        return Response.json({
            reply: answer
        });

    } catch (error) {
        console.error("Chat function error:", error);

        return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
};
