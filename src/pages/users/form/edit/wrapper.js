import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

export function FormWrapper({ user, children, title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {user ? (
        <div className='relative p-10 bg-white rounded shadow-md'>
          {children}
        </div>
      ) : (
        <div className='absolute min-h-full w-full flex flex-col justify-center items-center'>
          <Spin indicator={() => <LoadingOutlined spin />} />
        </div>
      )}
    </>
  );
}
