import './index.css'
import React from "react"
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from "./redux/store"
import { Provider } from 'react-redux'
import { hydrate, render } from "react-dom";

import App from './App';

const app = (
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      {/* <React.StrictMode> */}
        <App/>
        {/* </React.StrictMode> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
)

const rootElement = document.getElementById('root') ;
const root = createRoot(rootElement);
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

