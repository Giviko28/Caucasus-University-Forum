import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import authreg_en from './translation/en/authreg.json';
import authreg_ge from './translation/ge/authreg.json';
import navbar_en from './translation/en/navbar.json';
import navbar_ge from './translation/ge/navbar.json';

i18next.init({
  interpolation: {escapeValue: false},
  lng: "en",
  resources: {
    en: {
      authreg: authreg_en,
      navbar: navbar_en,
    },
    ge: {
      authreg: authreg_ge,
      navbar: navbar_ge,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
