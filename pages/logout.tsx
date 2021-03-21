import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};
export default function Logout(props: Props) {
  useEffect(() => {
    props.setIsSessionStateStale(true);
  }, [props]);
  return (
    <>
      <Head>
        <title>Logged out successfully</title>
      </Head>

      <h1 style={{ marginTop: '400px', marginLeft: '600px' }}>
        Logged out successfully
      </h1>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { deleteSessionByToken } = await import('../util/database');
  const { serializeEmptyCookieServerSide } = await import('../util/cookies');
  // const { pdfDocGenerator } = await deleteSessionByToken(
  //   context.req.cookies.session,
  // );
  const emptyCookie = serializeEmptyCookieServerSide('session');
  context.res.setHeader('Set-Cookie', emptyCookie);
  return { props: {} };
}
