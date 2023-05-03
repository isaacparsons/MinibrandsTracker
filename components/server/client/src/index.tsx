import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

import { ThemeProvider } from '@mui/material/styles';
import Theme from 'Theme';
import SnackBarProvider from 'context/SnackBarContext';
import SessionProvider from 'context/SessionContext';
import AdminModeProvider from 'context/AdminModeContext';

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <ApolloProvider client={client}>
      <SnackBarProvider>
        <SessionProvider>
          <AdminModeProvider>
            <App />
          </AdminModeProvider>
        </SessionProvider>
      </SnackBarProvider>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
