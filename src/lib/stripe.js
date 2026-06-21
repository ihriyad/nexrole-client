import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const PLAN_PRICE_IDS = {
  seeker_pro: "price_1TklBuRA9Bh8oYo5stzNOTd2",
  seeker_premium: "price_1TklvwRA9Bh8oYo5QkNvidFh",
  recruiter_growth: "price_1TklxORA9Bh8oYo5DzAKNuYe",
  recruiter_enterprise: "price_1TklyJRA9Bh8oYo52wjEVa5f"
};