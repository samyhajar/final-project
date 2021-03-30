import { loadStripe } from '@stripe/stripe-js';
import { Product } from '../components/Product';

export default function Home(props) {
  const stripeLoader = loadStripe(props.publicKey);

  async function handleClick(mode, priceID, quantity = 1) {
    const stripeClient = await stripeLoader;

    const { sessionId } = await fetch('/api/stripeIndex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        mode,
        priceID,
      }),
    }).then((res) => res.json());

    stripeClient.redirectToCheckout({
      sessionId,
    });
  }

  return (
    <div>
      <Product
        clickHandler={handleClick}
        productPrice={props.productPrices[0]}
      />
    </div>
  );
}

export async function getServerSideProps() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Stripe } = await import('stripe');
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);
  const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;

  const price = await stripeServer.prices.retrieve(process.env.PRICE);
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);

  return {
    props: {
      publicKey,
      productPrices: [
        {
          priceId: 'PRICE',
          unitAmount: price.unit_amount,
          currency: price.currency,
        },
        {
          priceId: 'PRICE2',
          unitAmount: price2.unit_amount,
          currency: price2.currency,
        },
      ],
    },
  };
}
