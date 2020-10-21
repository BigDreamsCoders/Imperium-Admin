import React from 'react';

export function FormInput({ children, label, id }) {
  return (
    <dl>
      <dd className='mb-1'>
        <label htmlFor={id}>{label}</label>
      </dd>
      <dd>{children}</dd>
    </dl>
  );
}
