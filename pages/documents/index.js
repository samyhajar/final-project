import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

import { format } from 'date-fns/format';
import { loadStripe } from '@stripe/stripe-js';
import { Product } from '../../components/Product';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Products(props) {
  const [url, setUrl] = useState('');
  const [documentId, setDocumentId] = useState(1);
  const router = useRouter();
  const stripeLoader = loadStripe(props.publicKey);
  const today = new Date();

  console.log('props:', props);

  useEffect(() => {
    async function createIframeUrl(pdfInput) {
      if (!process.browser) return;
      const docDefinition = {
        content: [
          { text: pdfInput.name, fontSize: 10, margin: [400, 2, 10, 0] },
          {
            text: pdfInput.address,
            fontSize: 10,
            style: 'header',
            margin: [400, 2, 10, 0],
          },
          {
            text: pdfInput.optionalAddress,
            fontSize: 10,
            style: 'header',
            margin: [400, 2, 10, 0],
          },
          { text: pdfInput.ort, fontSize: 10, margin: [400, 2, 10, 0] },
          { text: pdfInput.plz, fontSize: 10, margin: [400, 2, 10, 0] },
          { text: pdfInput.staat, fontSize: 10, margin: [400, 2, 10, 10] },
          { text: pdfInput, fontSize: 10, margin: [400, 2, 10, 60] },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 400 - 2 * 40,
                y2: 5,
                lineWidth: 0.5,
              },
            ],
          },
          { text: pdfInput.sender, fontSize: 10, margin: [40, 0, 10, 0] },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 400 - 2 * 40,
                y2: 5,
                lineWidth: 0.5,
              },
            ],
          },
          {
            text: pdfInput.recipient,
            fontSize: 15,
            margin: [40, 0, 10, 0],
            bold: false,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 400 - 2 * 40,
                y2: 5,
                lineWidth: 0.5,
              },
            ],
          },
          {
            text:
              pdfInput.ort +
              ', am ' +
              pdfInput.date.getDate() +
              '.' +
              (pdfInput.date.getMonth() + 1) +
              '.' +
              pdfInput.date.getFullYear(),
            fontSize: 10,
            margin: [390, 30, 10, 0],
          },
          { text: pdfInput.body, fontSize: 12, margin: [40, 40, 10, 0] },
        ],
      };
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getDataUrl(setUrl);
    }
    const document = props.documentsInfo.find((doc) => {
      return doc.id === documentId;
    });
    if (documentId) createIframeUrl(document);
  }, [documentId]);

  // date back to string and back to date
  props.documentsInfo.forEach(
    (document) => (document.date = new Date(document.date)),
  );

  async function handleClick(mode, envVarKey, quantity = 1) {
    const stripeClient = await stripeLoader;

    const { sessionId } = await fetch('/api/stripeIndex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
        mode,
        envVarKey,
        documentId,
      }),
    }).then((res) => res.json());

    stripeClient.redirectToCheckout({
      sessionId,
    });
  }

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <h1 style={{ marginLeft: '300px' }} className="title">
          Documents Page
        </h1>
        <div
          style={{
            height:
              '100%' /* Full-height: remove this if you want "auto" height */,
            width: '260px' /* Set the width of the sidebar */,
            position: 'fixed' /* Fixed Sidebar (stay in place on scroll) */,
            'z-index': '0' /* Stay on top */,
            top: '64px' /* Stay at the top */,
            left: '0',
            'background-color': 'white' /* Black */,
            'overflow-x': 'hidden' /* Disable horizontal scroll */,
            'padding-top': '80px',
            // 'border-right': '1px solid grey',
            'border-bottom': '1px solid grey',
            'box-shadow': '1px 1px 3px grey',
          }}
        >
          {props.documentsInfo.map((document) => (
            <div
              style={{
                display: 'flex',
                flexFlow: 'wrap',
                marginLeft: '0px',
                borderBottom: '1px solid grey',
                borderRadius: '5px',
                boxShadow: '0px 4px 5px 1px grey',
                marginBottom: '10px',
              }}
              className="grid__container"
              key={`product-page-${document.id}`}
            >
              {' '}
              <button
                style={{
                  width: '900px',
                  height: '40px',
                  'background-color': 'Transparent',
                  border: 'none',
                  outline: 'none',
                }}
                onClick={() => setDocumentId(document.id)}
              >
                {document.id}
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <iframe
              style={{
                left: '300px',
                width: '47%',
                position: 'absolute',
                height: '80%',
                borderRadius: '10px',
              }}
              frameBorder="0"
              title="hello"
              src={url}
              width="100%"
              height="500px"
            />

            <div
              style={{
                paddingLeft: '1100px',
                marginTop: '10px',
                maxWidth: '100%',
              }}
            >
              <Container>
                <Typography
                  component="h3"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  style={{ 'font-size': '14px' }}
                >
                  Here is how your letter would look like (according to the
                  standard of Windowed letter)
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  component="p"
                  style={{ 'font-size': '12px' }}
                >
                  If you are satisfied with the result, proceed to Cart
                </Typography>
                <Product
                  clickHandler={handleClick}
                  productPrices={props.productPrices[0]}
                />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getDocumentbyuserId } = await import('../../util/database');
  require('dotenv-safe').config();
  const documentsInfo = await getDocumentbyuserId();
  documentsInfo.forEach(
    (document) => (document.date = document.date.toString()),
  );

  // const createStat = await createStatus();

  const { Stripe } = await import('stripe');
  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);
  const publicKey = process.env.STRIPE_PUBLISHABLE_KEY;

  const price = await stripeServer.prices.retrieve(process.env.PRICE);
  const price2 = await stripeServer.prices.retrieve(process.env.PRICE2);

  return {
    props: {
      documentsInfo,
      publicKey,
      productPrices: [
        {
          envVarKey: 'PRICE',
          unitAmount: price.unit_amount,
          currency: price.currency,
        },
        // {
        //   envVarKey: 'PRICE2',
        //   unitAmount: price2.unit_amount,
        //   currency: price2.currency,
        // },
      ],
    },
  };
}
