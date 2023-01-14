import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Auth0Provider domain="dev-m31cz5mlzr4w514x.us.auth0.com" clientId="UarLBFDhukuU2QvGyoszgqno7g8F6uYp" redirectUri={window.location.origin} cacheLocation="localstorage">
      <BrowserRouter>
        <GithubProvider>
          <App />
        </GithubProvider>
      </BrowserRouter>
    </Auth0Provider >
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
