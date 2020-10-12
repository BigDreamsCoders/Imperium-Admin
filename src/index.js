import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import './index.css';
import './assets/tailwind/main.css';

const AppWithRouter = () => {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
      <ReactQueryDevtools />
    </>
  );
};

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
