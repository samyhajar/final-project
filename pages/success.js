import { Button } from '@material-ui/core';
import id from 'date-fns/locale/id';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import creator from './creator';
import AddressInfo from '../components/addressInfo';
import pdfMake from 'pdfmake/build/pdfmake';

import {
  Paper,
  input,
  Typography,
  TextField,
  inputClasses,
} from '@material-ui/core';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Success(props) {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => setIsLoading(false), 10000);
  return (
    <section
      style={{
        paddingTop: '150px',
        backgroundColor: '#F5F7FA',
        height: '100vh',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '12px',
          borderColor: 'transparent',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.15)',
          flexGrow: '1',
          border: '1px solid #E4E7EB',
          justifySelf: 'center',
          maxWidth: '600px',
          height: 'auto',
          padding: '50px',
          margin: '0 auto',
          marginTop: '0',
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
          {isLoading ? (
            <Loader
              type="TailSpin"
              color="#F7C948"
              height={80}
              width={80}
              timeout={10000}
            />
          ) : (
            <Button variant="contained" color="primary">
              Sent
            </Button>
          )}
        </div>
      </div>

      {/* <div>
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
      </div> */}
      {/* <Link href="/util/puppeteer">Hello</Link> */}
    </section>
  );
}

export async function getServerSideProps(ctx) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { Stripe } = await import('stripe');
  const {
    updateStatusToSuccessfulPayment,
    getDoc,
    createDocument,
  } = await import('../util/database');

  // const puppeteer = require('../util/puppeteer');

  const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { session_id: sessionId } = ctx.query;

  const session = await stripeServer.checkout.sessions.retrieve(sessionId);

  await updateStatusToSuccessfulPayment(
    Number(session.metadata.stripeChargesId),
  );

  const fs = require('fs');
  const docId = await getDoc(sessionId);
  docId.forEach((document) => (document.date = document.date.toString()));
  // console.log('LOG', docId);
  const pdfDocGenerator = await pdfMake.createPdf(docId);
  console.log('HAHHAHAHAHA', docId, sessionId, pdfDocGenerator.docDefinition);

  const layoutDoc = {
    content: [
      {
        text: pdfDocGenerator.docDefinition[0].name,
        fontSize: 10,
        margin: [400, 2, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].address,
        fontSize: 10,
        margin: [400, 2, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].optionaladdress,
        fontSize: 10,
        margin: [400, 2, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].ort,
        fontSize: 10,
        margin: [400, 2, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].plz,
        fontSize: 10,
        margin: [400, 2, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].staat,
        fontSize: 10,
        margin: [400, 2, 10, 45],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 350 - 2 * 40,
            y2: 5,
            lineWidth: 0.5,
          },
        ],
      },
      {
        text:
          pdfDocGenerator.docDefinition[0].name +
          ',' +
          pdfDocGenerator.docDefinition[0].address +
          ' ' +
          pdfDocGenerator.docDefinition[0].optionaladdress +
          pdfDocGenerator.docDefinition[0].ort +
          ' ' +
          pdfDocGenerator.docDefinition[0].plz +
          ' ' +
          pdfDocGenerator.docDefinition[0].staat,
        fontSize: 10,
        margin: [20, 2, 10, 0],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 350 - 2 * 40,
            y2: 5,
            lineWidth: 0.5,
          },
        ],
      },
      {
        text: pdfDocGenerator.docDefinition[0].recipientname,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        text: pdfDocGenerator.docDefinition[0].recipientaddress,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        text: pdfDocGenerator.docDefinition.recipientoptionaladdress,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        text: pdfDocGenerator.docDefinition[0].recipientort,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        text: pdfDocGenerator.docDefinition[0].recipientplz,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        text: pdfDocGenerator.docDefinition[0].recipientstaat,
        fontSize: 10,
        margin: [20, 0, 0, 0],
        bold: true,
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 350 - 2 * 40,
            y2: 5,
            lineWidth: 0.5,
          },
        ],
      },
      {
        text:
          pdfDocGenerator.docDefinition[0].ort +
          ', am' +
          ' ' +
          pdfDocGenerator.docDefinition[0].date
            .toString()
            .split(' ')
            .slice(0, 4)
            .join(' '),
        fontSize: 10,
        margin: [390, 30, 10, 0],
      },
      {
        text: pdfDocGenerator.docDefinition[0].body,
        fontSize: 12,
        margin: [20, 40, 20, 0],
      },
    ],
  };

  const pdfmake = require('pdfmake');

  const fontDescriptors = {
    Roboto: {
      normal:
        'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
      bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
      italics:
        'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
      bolditalics:
        'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf',
    },
  };

  const pdfPrinter = require('pdfmake/src/printer');
  const printer = new pdfPrinter(fontDescriptors);

  const pdfDoc = printer.createPdfKitDocument(layoutDoc);
  pdfDoc.pipe(
    fs.createWriteStream(
      `pdf/${pdfDocGenerator.docDefinition[0].document_id}.pdf`,
    ),
  );
  pdfDoc.end();

  const puppeteer = await require('../util/puppeteer');
  const getDocId = await require('../util/puppeteer');
  getDocId(pdfDocGenerator.docDefinition[0].document_id);

  return { props: { session } };
}

// TO DO
// 1. get document from the database DONE ✅

// 2. Save   pdf file to temp folder (docDefinition ) // ✅

// 3. Pass it To PUPPETEER ✅
// 4. Delete it from Temp

// await successStatusByPaymentPost();
