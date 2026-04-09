import cloudbase from "@cloudbase/node-sdk";

type CloudbaseEvent = {
  httpMethod?: string;
  body?: string;
};

type CloudbaseResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

const app = cloudbase.init({
  env: cloudbase.SYMBOL_CURRENT_ENV
});

const db = app.database();

export async function main(event: CloudbaseEvent): Promise<CloudbaseResponse> {
  if (event.httpMethod === "GET") {
    const result = await db.collection("todos").limit(20).get();
    return json(200, { todos: result.data ?? [] });
  }

  if (event.httpMethod === "POST") {
    const payload = safeJson(event.body);
    const text = String(payload.text ?? "").trim();
    if (!text) {
      return json(400, { message: "text is required" });
    }

    const created = await db.collection("todos").add({
      text,
      done: false,
      createdAt: Date.now()
    });

    return json(201, { id: created.id, text, done: false });
  }

  return json(405, { message: "method not allowed" });
}

function safeJson(input?: string): Record<string, unknown> {
  if (!input) return {};
  try {
    return JSON.parse(input) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function json(statusCode: number, body: Record<string, unknown>): CloudbaseResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}
