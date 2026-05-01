import Stripe from "stripe";

export const PLANS = {
  free: {
    name: "Besplatno",
    price: 0,
    analyses: 2,
    stripePriceId: null,
  },
  pro: {
    name: "NoarBeauty",
    price: 14990,
    analyses: -1,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
  },
} as const;

export type Plan = keyof typeof PLANS;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia", typescript: true });
}
