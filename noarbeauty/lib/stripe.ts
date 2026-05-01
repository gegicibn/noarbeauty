import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

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
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
} as const;

export type Plan = keyof typeof PLANS;
