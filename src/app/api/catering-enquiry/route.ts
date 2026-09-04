import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    !body.name ||
    !body.mobile ||
    !body.email ||
    !body.eventDate ||
    !body.guests ||
    !body.deliveryType ||
    !body.postcode
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: wire up email notification to westbury@ziapizza.com
  console.log("[catering-enquiry]", {
    name: body.name,
    mobile: body.mobile,
    email: body.email,
    eventDate: body.eventDate,
    guests: body.guests,
    deliveryType: body.deliveryType,
    postcode: body.postcode,
    budget: body.budget ?? "",
    dietary: body.dietary ?? "",
    message: body.message ?? "",
    source: "ziapizza.co.uk/catering/westbury",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
