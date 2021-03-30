import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Header from '../components/Header';

export default function MyApp(props) {
  const [isSessionStateStale, setIsSessionStateStale] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/is-session-valid');
      const newValue = await response.json();
      setIsSessionValid(newValue.isSessionValid);
      setUserName(newValue.userName);
      setIsSessionStateStale(false);
    }

    if (isSessionStateStale) fetchData();
  }, [isSessionStateStale, isSessionValid]);

  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header userName={userName} session={isSessionValid} />
        <Component
          {...pageProps}
          setIsSessionStateStale={setIsSessionStateStale}
        />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
