import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import './index.less';
import './assets/tailwind/main.css';

function AppWithRouter() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
      {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
    </>
  );
}

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
