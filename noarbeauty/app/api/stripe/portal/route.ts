import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe nije konfigurisan" }, { status: 503 });
  }

  const { stripe } = await import("@/lib/stripe");
  const { createClient } = await import("@/lib/supabase/server");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url));

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.redirect(new URL("/settings", request.url));
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${new URL(request.url).origin}/settings`,
  });

  return NextResponse.redirect(session.url);
}
