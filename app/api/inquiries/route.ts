import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";

export const runtime = "edge";

function value(input: unknown, max: number) { return typeof input === "string" ? input.trim().slice(0, max) : ""; }

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length")) > 12000) return NextResponse.json({ error: "That request is too long." }, { status: 413 });
    body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid request");
  } catch { return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 }); }
  if (value(body.website, 200)) return NextResponse.json({ ok: true });
  const name = value(body.name, 120), business = value(body.business, 160), email = value(body.email, 254), phone = value(body.phone, 40), workflow = value(body.workflow, 5000), software = value(body.software, 500);
  if (!name || !business || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || workflow.length < 10) return NextResponse.json({ error: "Please complete the required fields with a valid email and at least 10 characters about the workflow." }, { status: 400 });
  if (!env.DB) { console.error("D1 DB binding is unavailable"); return NextResponse.json({ error: "The form is temporarily unavailable. Please try again shortly." }, { status: 503 }); }
  try {
    await env.DB.prepare("INSERT INTO inquiries (id, created_at, name, business, email, phone, workflow, software, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), Date.now(), name, business, email, phone || null, workflow, software || null, "new").run();
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { console.error("Inquiry insert failed", error); return NextResponse.json({ error: "The form is temporarily unavailable. Please try again shortly." }, { status: 503 }); }
}
