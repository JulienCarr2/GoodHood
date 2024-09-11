import React from 'react'
import { ApolloProvider } from "@apollo/client";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import apolloClient from "./utils/apolloClient.js";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CookiesProvider>
  </ApolloProvider>,
)
