import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App txt="prop"/>, 
  document.getElementById('root'));
registerServiceWorker();
