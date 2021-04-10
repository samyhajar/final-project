import Stripe from 'stripe';
import {
  addSessionToOrder,
  createOrder,
  createOrderPost,
  updateStatusToSuccessfulPayment,
} from '../../util/database.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.send({
      error: 'Method need to be POST',
    });
  }

  const domainURL = 'http://localhost:3000';

  const { quantity, mode, envVarKey, documentId } = req.body;

  // TO DO :
  // STATUS OF OPENED ORDERS!

  const stripeChargesId = await createOrder(documentId);
  const postOrder = await createOrderPost(documentId);

  const pmTypes = ['card'];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: pmTypes,
    mode: mode,
    locale: 'en',
    metadata: { stripeChargesId },
    line_items: [
      {
        price: process.env[envVarKey],
        quantity: quantity,
      },
    ],

    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled?session_id={CHECKOUT_SESSION_ID}`,
  });

  addSessionToOrder(session.id, stripeChargesId);

  res.send({
    sessionId: session.id,
    stripeChargesId,
  });
}

// CREATE THE ORDER ROW (THIS GIVES YOU ORDER ID ) ✅
// CALL PASSING A ROW ID TO STRIPE -> response SESSION ID✅
// UPDATE THE STRIPE SESSION ID✅
// UPDATE STATUS OF STRIPE CHARGES AFTER SUCCESSFUL/FAILED PAYMENT
// -> SQL FUNCTIONS CREATED ✅
// -> ADD EVENT HANDLER
