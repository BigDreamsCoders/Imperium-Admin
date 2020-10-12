import React, { useState } from 'react';
import { Steps, Form } from 'antd';
import { BasicInfo } from './form/basicInfo';

const { Step } = Steps;

const fields = {
  0: ['email', 'firstName', 'lastName', 'birthday', 'genderId', 'roleId'],
  1: ['type', 'state'],
  2: ['weight', 'height'],
};

const components = (form, next) => [
  {
    key: 'Basic Info',
    component: () => {
      return <BasicInfo form={form} next={next} />;
    },
  },
  {
    key: 'Membership',
    component: () => {
      return <></>;
    },
  },
  {
    key: 'Medical Record',
    component: () => {
      return <></>;
    },
  },
];

export const NewUser = () => {
  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm();

  // const onFinish = () => {};

  const onChange = (newValue = current + 1) => {
    form.validateFields(fields[current], (err, values) => {
      console.log(values);
      if (!err) setCurrent(newValue);
    });
  };

  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <Steps type='navigation' current={current} onChange={onChange}>
        <Step title='Informacion basica' />
        <Step title='Membresia' />
        <Step title='Ficha Médica' />
      </Steps>
      <div className='relative w-full h-full flex justify-center items-center'>
        {components(form, onChange)[current].component()}
      </div>
    </div>
  );
};
