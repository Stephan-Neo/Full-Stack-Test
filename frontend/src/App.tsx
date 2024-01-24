import React, { ReactElement } from 'react';
import GlobalStyles from './styles/global';
import Routes from './routes';

export default function App(): ReactElement {
  return (
    <>
      <Routes />
      <GlobalStyles />
    </>
  );
}
