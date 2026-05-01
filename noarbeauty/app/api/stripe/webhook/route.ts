import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe nije konfigurisan" }, { status: 503 });
  }

  const { getStripe } = await import("@/lib/stripe");
  const { createAdminClient } = await import("@/lib/supabase/server");

  const stripe = getStripe();
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createAdminClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { user_id?: string }; subscription?: string };
    const userId = session.metadata?.user_id;
    if (userId) {
      await supabase
        .from("profiles")
        .update({ plan: "pro" as const, stripe_subscription_id: session.subscription ?? null })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as { customer: string };
    await supabase
      .from("profiles")
      .update({ plan: "free", stripe_subscription_id: null })
      .eq("stripe_customer_id", sub.customer);
  }

  return NextResponse.json({ received: true });
}
