import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';

export default function Products(props) {
  const [url, setUrl] = useState('');
  // date back to string and back to date
  props.documentsInfo.forEach(
    (document) => (document.date = new Date(document.date)),
  );

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
                border: '1px solid grey',
                'border-radius': '5px',
                paddingBottom: '20px',
                marginBottom: '10px',
                background: '#f5f7fa',
              }}
              className="grid__container"
              key={`product-page-${document.id}`}
            >
              {' '}
              <a href="/">{document.id}</a>
            </div>
          ))}
        </div>
        <div>
          <iframe
            style={{
              left: '50%',
              width: '50%',
              position: 'absolute',
              height: '80%',
            }}
            // height: 100%;
            // right: 0;
            // top: 0;
            // bottom: 0;
            // position: absolute;"
            title="hello"
            src={url}
            width="100%"
            height="500px"
          />
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
