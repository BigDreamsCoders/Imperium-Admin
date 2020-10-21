import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Steps, Form, notification } from 'antd';
import { newUserComponents } from './utils/stepsComponents';
import { createUser } from 'services/api/user';

const { Step } = Steps;

const fields = {
  0: ['email', 'firstName', 'lastName', 'birthday', 'genderId', 'roleId'],
  1: ['type', 'state'],
  2: ['weight', 'height'],
};

function getAllFields() {
  return Object.keys(fields).reduce((prev, field) => {
    return [...prev, ...fields[field]];
  }, []);
}

export function NewUser() {
  const [current, setCurrent] = useState(0);
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const values = await form.validateFields(getAllFields());
      const user = {
        ...values,
        birthday: new Date(values.birthday).toISOString(),
        membership: {
          type: values.type,
          state: values.state,
        },
        file: {
          weight: Number(values.weight),
          height: Number(values.height),
        },
      };
      await createUser(user);
      notification.success({ message: 'Usuario creado exitosamente' });
      history.replace('/users');
    } catch (e) {
      if (e.response) {
        switch (e.response.data.statusCode) {
          default: {
            notification.error({ message: 'Algo malo ocurrio xd' });
            break;
          }
        }
      }
    }
  };

  const next = async () => {
    try {
      await form.validateFields(fields[current]);
      setCurrent(current + 1);
    } catch (e) {}
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = async (value) => {
    try {
      await form.validateFields(fields[current]);
      setCurrent(value);
    } catch (e) {}
  };

  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <Steps type='navigation' current={current} onChange={onChange}>
        <Step title='Informacion básica' />
        <Step title='Membresía' />
        <Step title='Ficha Médica' />
      </Steps>
      <div className='relative py-4 w-full h-full flex justify-center items-center'>
        {newUserComponents(form, prev, next, onFinish)[current].component()}
      </div>
    </div>
  );
}
