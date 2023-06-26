import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components';

// const App = whatever comes from the file as default
// const { App } = whatever comes from the file as an object

// const title = React.createElement(
//   'a',
//   {
//     href: 'https://learn.digitalstack.ro',
//     target: '_blank',
//   },
//   'This is not a strong',
//   React.createElement('strong', {}, 'This is a strong')
// );

// const title = (
//   <a href="https://learn.digitalstack.ro" target="_blank">
//     This is not a strinbg <strong>This is a stirnv</strong>
//   </a>
// );
// console.log(title);

// React.createElement(App, {});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
