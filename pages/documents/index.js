import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';

export default function Products(props) {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div>
        <h1 className="title">Documents Page</h1>
        <div>
          {props.documentsInfo.map((document) => (
            <div
              style={{ display: 'flex', 'flex-flow': 'wrap', padding: '10px' }}
              className="grid__container"
              key={`product-page-${document.id}`}
            >
              {document.id}
              {document.vor_nachname}
              {document.addresse}
              {document.door_block}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const { getDocumentbyuserId } = await import('../../util/database');

  const documentsInfo = await getDocumentbyuserId();

  console.log(documentsInfo);
  return {
    props: { documentsInfo }, // will be passed to the page component as props
  };
}
