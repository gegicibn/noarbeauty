import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
    name: "Pro",
    price: 990,
    analyses: -1, // neograničeno
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  elite: {
    name: "Elite",
    price: 2490,
    analyses: -1,
    stripePriceId: process.env.STRIPE_ELITE_PRICE_ID!,
  },
} as const;

export type Plan = keyof typeof PLANS;
