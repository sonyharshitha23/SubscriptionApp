import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const prices = async (requestAnimationFrame, res) => {
  const prices = await stripe.prices.list();
  console.log("prices", prices);
  res.json(prices.data);
};
