import React from 'react';
import { useLocation } from 'react-router-dom';

export function ErrorPage() {
  const location = useLocation();

  if (location?.state) {
    const state = location.state;
    if (state?.conn) {
      return (
        <>
          <BigText>You dont have internet my dude</BigText>
        </>
      );
    }
    if (state?.timeout)
      return (
        <>
          <BigText>The server does not respond</BigText>
        </>
      );
  }
  return (
    <>
      <BigText>404</BigText>
    </>
  );
}

function BigText({ children }) {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h1 style={{ fontSize: 48 }} className='text-primary'>
        {children}
      </h1>
    </div>
  );
}
