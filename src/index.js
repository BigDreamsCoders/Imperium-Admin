import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
//import { ReactQueryDevtools } from 'react-query-devtools';
import './index.css';
import './assets/main.css';

const AppWithRouter = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
  );
};

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
