import React, { useState } from 'react';
import { Steps, Form, notification } from 'antd';
import { BasicInfo } from './form/basicInfo';
import { MembershipInfo } from './form/membershipInfo';
import { MedicalInfo } from './form/medicalInfo';
import { createUser } from '../../services/api';
import { useHistory } from 'react-router-dom';

const { Step } = Steps;

const fields = {
  0: ['email', 'firstName', 'lastName', 'birthday', 'genderId', 'roleId'],
  1: ['type', 'state'],
  2: ['weight', 'height'],
};

const getAllFields = () => {
  return Object.keys(fields).reduce((prev, field) => {
    return [...prev, ...fields[field]];
  }, []);
};

const components = (form, prev, next, finish) => [
  {
    key: 'Basic Info',
    component: () => {
      return <BasicInfo form={form} next={next} />;
    },
  },
  {
    key: 'Membership',
    component: () => {
      return (
        <MembershipInfo form={form} next={next} prev={prev}></MembershipInfo>
      );
    },
  },
  {
    key: 'Medical Record',
    component: () => {
      return <MedicalInfo form={form} prev={prev} finish={finish} />;
    },
  },
];

export const NewUser = () => {
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
    } catch (e) {
      console.log(e);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = async (value) => {
    try {
      await form.validateFields(fields[current]);
      setCurrent(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <Steps type='navigation' current={current} onChange={onChange}>
        <Step title='Informacion básica' />
        <Step title='Membresía' />
        <Step title='Ficha Médica' />
      </Steps>
      <div className='relative py-4 w-full h-full flex justify-center items-center'>
        {components(form, prev, next, onFinish)[current].component()}
      </div>
    </div>
  );
};
