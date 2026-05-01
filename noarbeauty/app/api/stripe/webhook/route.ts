import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe nije konfigurisan" }, { status: 503 });
  }

  const { stripe } = await import("@/lib/stripe");
  const { createAdminClient } = await import("@/lib/supabase/server");
  const Stripe = (await import("stripe")).default;

  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as InstanceType<typeof Stripe.Checkout.Session>;
      const userId = (session as any).metadata?.user_id;
      if (userId) {
        await supabase
          .from("profiles")
          .update({
            plan: "pro" as const,
            stripe_subscription_id: (session as any).subscription as string,
          })
          .eq("id", userId);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as any;
      await supabase
        .from("profiles")
        .update({ plan: "free", stripe_subscription_id: null })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
