import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyGraphqlApp from './MyGraphqlApp';
import Latihan1 from './Latihan1';
import reportWebVitals from './reportWebVitals';

// graphql
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// single instance = singleton pattern
const client = new ApolloClient({
  // uri: 'https://testbedql.southeastasia.cloudapp.azure.com:8081',
  uri: 'https://testbedql.southeastasia.cloudapp.azure.com:8082',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// dependency injection
root.render(
  <ApolloProvider client={client}>
    <Latihan1 />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
