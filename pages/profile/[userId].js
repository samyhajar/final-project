import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Error, User } from '../../util/types';
import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import Fade from 'react-reveal/Fade';

export default function Profile(props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>{props.errors[0].message}</title>
        </Head>
        <h1>{props.errors[0].message}</h1>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>User Profile: {props.user.userName}</title>
      </Head>

      {/* <div>id: {props.user.id}</div> */}
      <div className="bg">
        <Fade right>
          <div className="centered">
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="center"
            >
              <Grid>
                <Box>
                  <Typography variant="h2" component="p">
                    Hello {props.user.userName}!
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getUserById, getSessionByToken } = await import(
    '../../util/database'
  );

  const session = await getSessionByToken(context.req.cookies.session);
  console.log(session);
  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const user = await getUserById(context.query.userId);
  return { props: { user: user } };
}
