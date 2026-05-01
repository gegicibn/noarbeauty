import { NextResponse } from "next/server";
import { stripe, PLANS, type Plan } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const plan = (url.searchParams.get("plan") as Plan) ?? "pro";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url));

  const planConfig = PLANS[plan];
  if (!planConfig.stripePriceId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: planConfig.stripePriceId, quantity: 1 }],
    success_url: `${url.origin}/dashboard?success=1`,
    cancel_url: `${url.origin}/dashboard`,
    locale: "auto",
    metadata: { user_id: user.id, plan },
  });

  return NextResponse.redirect(session.url!);
}
