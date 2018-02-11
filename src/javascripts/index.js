import React from 'react';

import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

if(document.getElementById('root') !== null) {
  hydrate(
    <Router>
      <App />
    </Router>, document.getElementById('root'))
}

