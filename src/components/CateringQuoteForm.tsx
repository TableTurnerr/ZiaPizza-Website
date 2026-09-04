"use client";

import React, { useState } from "react";

const ORDER_TYPES = [
  "Office Lunches",
  "Corporate Catering",
  "Group Orders",
  "Corporate Accounts",
];

export default function CateringQuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const companyName = String(data.get("companyName") || "");
    const email = String(data.get("email") || "");
    const telephone = String(data.get("telephone") || "");
    const eventDate = String(data.get("eventDate") || "");
    const guests = String(data.get("guests") || "");
    const orderType = String(data.get("orderType") || "");
    const deliveryAddress = String(data.get("deliveryAddress") || "");
    const additionalRequirements = String(data.get("additionalRequirements") || "");

    const message = [
      "Catering & Corporate Orders quote request",
      "",
      `Name: ${name}`,
      `Company Name (Optional): ${companyName || "N/A"}`,
      `Email Address: ${email}`,
      `Telephone Number: ${telephone}`,
      `Event Date: ${eventDate}`,
      `Number of Guests: ${guests}`,
      `Order Type: ${orderType}`,
      `Delivery Address: ${deliveryAddress}`,
      "Additional Requirements:",
      additionalRequirements,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: "Catering & Corporate Orders quote request",
          message,
          companyName,
          telephone,
          eventDate,
          guests,
          orderType,
          deliveryAddress,
          additionalRequirements,
        }),
      });

      if (!response.ok) throw new Error("Quote request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Name</span>
        <input required name="name" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Company Name (Optional)</span>
        <input name="companyName" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Email Address</span>
        <input required name="email" type="email" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Telephone Number</span>
        <input required name="telephone" type="tel" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Event Date</span>
        <input required name="eventDate" type="date" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Number of Guests</span>
        <input required name="guests" type="number" min="1" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Order Type</span>
        <select required name="orderType" defaultValue="" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary">
          <option value="" disabled>Select order type</option>
          {ORDER_TYPES.map((type) => (
            <option key={type} value={type} className="bg-[#0D0D0D]">{type}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Delivery Address</span>
        <input required name="deliveryAddress" className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary" />
      </label>

      <label className="sm:col-span-2 flex flex-col gap-1.5">
        <span className="text-normal4 tracking-wide uppercase" style={{ color: "var(--tt-color-text-gray)" }}>Additional Requirements</span>
        <textarea required name="additionalRequirements" rows={5} className="bg-black/20 border border-white/15 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-primary resize-y" />
      </label>

      {status === "sent" && (
        <p className="sm:col-span-2 text-accent text-normal3">Thanks, we got it. We&apos;ll come back to you within a day.</p>
      )}
      {status === "error" && (
        <p className="sm:col-span-2 text-primary text-normal3">Something went wrong. Please email us directly at info@ziapizza.com.</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="sm:col-span-2 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-normal2 font-bold py-3 rounded-lg transition-colors"
      >
        {status === "sending" ? "Sending..." : "Request a Quote"}
      </button>
    </form>
  );
}
