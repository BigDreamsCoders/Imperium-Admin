import React from 'react';

export function FormInput(props) {
  const { children, label, id } = props;
  return (
    <dl>
      <dd className='mb-1'>
        <label htmlFor={id}>{label}</label>
      </dd>
      <dd>{children}</dd>
    </dl>
  );
}
