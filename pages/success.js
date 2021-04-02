import { Button } from '@material-ui/core';
import Link from 'next/link';
// import StripeIndex from '../pages/api/stripeIndex';

export default function Success(props) {
  return (
    <section>
      <h1>Successful Transaction</h1>
      <div>
        <p>
          <span>Id:</span>
          {'   '}
          {props.session.id}
        </p>
        <p>
          <span> Transaction total:</span> {'   '}
          {props.session.amount_total}
        </p>
        <p>
          <span> Customer email:</span> {'   '}
          {props.session.customer_details.email}
        </p>
        <p>{props.session.payment_status}</p>
        <p>
          <span> Payment status:</span> {'   '}
          {JSON.stringify(props.session.metadata)}
        </p>
        <pre>{JSON.stringify(props.session, null, 2)}</pre>
      </div>
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/util/puppeteer">Hello</Link>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Stripe } = await import('stripe');
  const { successStatusByPayment } = await import('../util/database');

  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { session_id: sessionId } = ctx.query;

  const session = await stripeServer.checkout.sessions.retrieve(sessionId);

  successStatusByPayment(JSON.parse(session.metadata.stripeChargesId));
  console.log(JSON.parse(session.metadata.stripeChargesId));

  return { props: { session } };
}
