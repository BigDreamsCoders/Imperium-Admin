import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ label, icon: Icon }) {
  return (
    <div
      className='w-40 h-40 flex justify-center items-center flex-col
      bg-white shadow-md transition-transform duration-200 ease-in-out hover:shadow-xl
      transform hover:scale-110'>
      <Icon style={{ fontSize: '64px' }} />
      <h2>{label}</h2>
    </div>
  );
}

export function CardPanel({ routes, title }) {
  return (
    <div className='min-h-full w-full flex flex-col justify-center items-center'>
      <h1 style={{ fontSize: '48px' }}>{title}</h1>
      <div className='flex justify-evenly flex-wrap w-full'>
        {routes.map((item, index) => (
          <Link
            to={item.route}
            key={index}
            className='m-12 hover:text-accent-light'>
            <Card label={item.label} icon={item.icon()} />
          </Link>
        ))}
      </div>
    </div>
  );
}
