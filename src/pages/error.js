import React from 'react';
import { useLocation } from 'react-router-dom';

export const ErrorPage = () => {
  const location = useLocation();
  if (location?.state) {
    const state = location.state;
    if (state?.conn) {
      return (
        <>
          <h1>You dont have internet my dude</h1>
        </>
      );
    }
    if (state?.timeout)
      return (
        <>
          <h1>The server does not respond</h1>
        </>
      );
  }
  return (
    <>
      <h1>404</h1>
    </>
  );
};
