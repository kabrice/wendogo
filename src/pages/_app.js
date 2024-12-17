import React from 'react';
import { Provider } from 'react-redux';
import { getStore } from '../redux/store';
import Spinner from '../components/Spinner';
import '../index.css';
import { Analytics } from '@vercel/analytics/next';

const MyApp = ({ Component, pageProps }) => {
  const store = getStore();

  return (
    <Provider store={store}>
      <Spinner />
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default MyApp;
