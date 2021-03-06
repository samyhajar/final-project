import { Button } from '@material-ui/core';
import Link from 'next/link';

export default function Success(props) {
  console.log(props.session, null, 2);
  return (
    <section>
      <h1>FAILED Transaction</h1>
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
        </p>
        <p>
          <span> Payment status:</span> {'   '}
          {JSON.stringify(props.session.metadata)}
        </p>
        <pre>{JSON.stringify(props.session, null, 2)}</pre>
      </div>
      <Link href="/">
        <a>home</a>
      </Link>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Stripe } = await import('stripe');
  const { updateStatusToRejectedPayment } = await import('../util/database');

  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { session_id: sessionId } = ctx.query;
  const session = await stripeServer.checkout.sessions.retrieve(sessionId);
  updateStatusToRejectedPayment(Number(session.metadata.stripeChargesId));

  return { props: { session } };
}
