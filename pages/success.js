import { Button } from '@material-ui/core';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// import StripeIndex from '../pages/api/stripeIndex';

export default function Success(props) {
  return (
    <section>
      <div
        style={{
          background: '#f5f7fa',
          borderRadius: '12px',
          borderColor: 'transparent',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.15)',
          flexGrow: '1',
          border: '1px solid #dddddd',
          justifySelf: 'center',
          maxWidth: '600px',
          height: 'auto',
          padding: '50px',
          margin: '0 auto',
          marginTop: '100px',
        }}
      >
        <h1>Successful Transaction </h1>
        <p>Thanks for choosing our service! </p>
        <p>Please allow us some time to send your letter... </p>
        <div
          style={{
            paddingLeft: '40%',
            paddingBottom: '40px',
            paddingTop: '20px',
          }}
        >
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={10000}
          />
        </div>
      </div>

      <div>
        {/* <p>
          <span>Id:</span>
          {'   '}
          {props.session.id}
        </p> */}
        {/* <p>
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
        </p> */}
        {/* <pre>{JSON.stringify(props.session, null, 2)}</pre> */}
      </div>
      {/* <Link href="/util/puppeteer">Hello</Link> */}
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

  return { props: { session } };
}
