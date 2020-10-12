import React from 'react';

export const Card = ({ label, icon: Icon }) => {
  return (
    <div
      className='w-40 h-40 flex justify-center items-center flex-col
      bg-white shadow-md transition-transform duration-200 ease-in-out hover:shadow-xl
      transform hover:scale-110'>
      <Icon style={{ fontSize: '64px' }} />
      <h2>{label}</h2>
    </div>
  );
};
