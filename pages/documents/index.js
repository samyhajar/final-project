import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Container, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Products(props) {
  const [url, setUrl] = useState('');
  const router = useRouter();

  // date back to string and back to date
  props.documentsInfo.forEach(
    (document) => (document.date = new Date(document.date)),
  );
  async function createIframeUrl(pdfInfo) {
    if (!process.browser) return;
    var docDefinition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        // using a { text: '...' } object lets you set styling properties
        { text: pdfInfo.name, fontSize: 10, margin: [400, 2, 10, 0] },
        {
          text: pdfInfo.address,
          fontSize: 10,
          style: 'header',
          margin: [400, 2, 10, 0],
        },
        {
          text: pdfInfo.optionalAddress,
          fontSize: 10,
          style: 'header',
          margin: [400, 2, 10, 0],
        },
        // if you set the value of text to an array instead of a string, you'll be able
        // to style any part individually
        { text: pdfInfo.ort, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: pdfInfo.plz, fontSize: 10, margin: [400, 2, 10, 0] },
        { text: pdfInfo.staat, fontSize: 10, margin: [400, 2, 10, 10] },
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
        { text: pdfInfo.sender, fontSize: 10, margin: [40, 0, 10, 0] },
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
          text: pdfInfo.recipient,
          fontSize: 15,
          margin: [40, 50, 10, 0],
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
        { text: pdfInfo.date.getDay(), fontSize: 10, margin: [450, 30, 10, 0] },
        { text: pdfInfo.body, fontSize: 12, margin: [40, 40, 10, 0] },
      ],
    };
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getDataUrl(setUrl);
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
                'flex-flow': 'wrap',
                marginLeft: '0px',
                borderBottom: '1px solid grey',
                'border-radius': '5px',
                'box-shadow': '0px 4px 2px -3px #556cd6',
                marginBottom: '10px',
                // background: '#f5f7fa',
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
                onClick={() => createIframeUrl(document)}
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
              frameborder="0"
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
              <Container style={{ marginLeft: '300px' }}>
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
                <Button
                  variant="outlined"
                  color="primary"
                  variant="contained"
                  color="primary"
                  align="center"
                  style={{
                    marginLeft: '320px',
                    marginTop: '70px',
                    // paddingLeft: '1000px',
                    // paddingRight: '100px',
                  }}
                  onClick={() => router.push('/stripe')}
                >
                  Proceed to Cart
                </Button>
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

  const documentsInfo = await getDocumentbyuserId();
  documentsInfo.forEach(
    (document) => (document.date = document.date.toString()),
  );

  console.log('log :', documentsInfo);
  return {
    props: { documentsInfo }, // will be passed to the page component as props
  };
}
