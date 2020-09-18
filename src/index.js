import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';

const AppWithRouter = () => (
  <Router basename={`${process.env.PUBLIC_URL}`}>
    <App />
    <ReactQueryDevtools />
  </Router>
);

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
