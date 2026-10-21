"use client";

import { useState, type FormEvent } from "react";

const netlifyForms = process.env.NEXT_PUBLIC_INQUIRY_BACKEND === "netlify";

type Status = "idle" | "sending" | "success" | "error";

export default function AuditForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending"); setMessage("");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = netlifyForms
        ? await fetch("/__forms.html", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data as Record<string, string>).toString(),
          })
        : await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = netlifyForms ? {} : await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We couldn't send your request. Please try again.");
      form.reset(); setStatus("success"); setMessage("Thanks — your workflow is on our list. We'll reply to the email you provided.");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "We couldn't send your request. Please try again."); }
  }
  return <form name="workflow-leak-audit" method="post" onSubmit={submit} noValidate={false}>
    {netlifyForms && <input type="hidden" name="form-name" value="workflow-leak-audit"/>}
    <div className="form-two"><label>Name <span>*</span><input name="name" autoComplete="name" required maxLength={120}/></label><label>Business <span>*</span><input name="business" autoComplete="organization" required maxLength={160}/></label></div>
    <div className="form-two"><label>Email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254}/></label><label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" maxLength={40}/></label></div>
    <label>What repetitive task or business process drives you crazy? <span>*</span><textarea name="workflow" required minLength={10} maxLength={5000} rows={5} placeholder="For example: We finish jobs in the field, but the office waits days for notes and photos before it can invoice."/></label>
    <label>What software do you currently use? <small>(optional)</small><input name="software" maxLength={500} placeholder="QuickBooks, Google Sheets, scheduling app…"/></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <button className="button form-submit" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending…" : "Find My Automation Opportunity"}<span aria-hidden="true">↗</span></button>
    <p className="form-privacy">We use these details to respond to your request. No mailing list.</p>
    {status !== "idle" && status !== "sending" && <p className={`form-message ${status}`} role={status === "error" ? "alert" : "status"}>{message}</p>}
  </form>;
}
