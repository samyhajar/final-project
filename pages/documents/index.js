import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core';
import Description from '@material-ui/icons/Description';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Product } from '../../components/Product';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Products(props) {
  const [url, setUrl] = useState('');
  const [documentId, setDocumentId] = useState(1);
  const router = useRouter();
  const stripeLoader = loadStripe(props.publicKey);

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
            text: pdfInput.optionaladdress,
            fontSize: 10,
            style: 'header',
            margin: [400, 2, 10, 0],
          },
          {
            text: pdfInput.ort + ',' + ' ' + pdfInput.plz,
            fontSize: 10,
            margin: [400, 2, 10, 0],
          },
          // { text: pdfInput.plz, fontSize: 10, margin: [400, 2, 10, 0] },
          {
            text: pdfInput.staat,
            fontSize: 10,
            margin: [400, 2, 10, 80],
          },

          // {
          //   text: pdfInput.optionalAddress,
          //   fontSize: 10,
          //   margin: [400, 2, 10, 60],
          // },
          // { text: pdfInput.ort, fontSize: 10, margin: [0, 2, 10, 60] },
          // { text: pdfInput.plz, fontSize: 10, margin: [0, 2, 10, 60] },
          // { text: pdfInput.staat, fontSize: 10, margin: [0, 2, 10, 60] },
          {
            canvas: [
              {
                type: 'line',
                x1: 20,
                y1: 5,
                x2: 350 - 2 * 40,
                y2: 5,
                lineWidth: 0.5,
              },
            ],
          },
          {
            text:
              pdfInput.name +
              ' ' +
              pdfInput.address +
              ' ' +
              pdfInput.optionaladdress +
              ' ' +
              pdfInput.ort +
              ' ' +
              pdfInput.plz +
              ' ' +
              pdfInput.staat,
            fontSize: 10,
            margin: [20, 2, 10, 0],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 20,
                y1: 5,
                x2: 350 - 2 * 40,
                y2: 5,
                lineWidth: 0.5,
              },
            ],
          },
          {
            text: pdfInput.recipientname,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            text: pdfInput.recipientaddress,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            text: pdfInput.recipientoptionaladdress,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            text: pdfInput.recipientort,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            text: pdfInput.recipientplz,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            text: pdfInput.recipientstaat,
            fontSize: 10,
            margin: [20, 0, 0, 0],
            bold: true,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 20,
                y1: 5,
                x2: 350 - 2 * 40,
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
          { text: pdfInput.body, fontSize: 12, margin: [20, 40, 20, 0] },
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
      <div className="documents">
        <div className="sidebar">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Your Letters
              </ListSubheader>
            }
          >
            {props.documentsInfo.map((document) => {
              return (
                <div key={document.id}>
                  <ListItem
                    key={document.id}
                    onClick={() => setDocumentId(document.id)}
                    button
                  >
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText
                      primary={document.recipientname}
                      secondary={
                        document.date.getDate().toString() +
                        '.' +
                        (document.date.getMonth() + 1).toString() +
                        '.' +
                        document.date.getFullYear().toString()
                      }
                    />
                  </ListItem>
                </div>
              );
            })}
          </List>
        </div>
        <div className="body">
          <iframe
            value="75%"
            style={{
              width: '47%',
              position: 'absolute',
              height: '90%',
              borderRadius: '10px',
            }}
            frameBorder="0"
            title="hello"
            src={url}
            width="100%"
            height="500px"
          />
        </div>
        <div className="content">
          <Container>
            <Product
              clickHandler={handleClick}
              productPrices={props.productPrices[0]}
            />
          </Container>
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
