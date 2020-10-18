import React, { useState } from 'react';
import Icon, { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { FormInput } from '../components/formInput';
import { login } from '../services/api';

const { Item } = Form;

export function Login() {
  const [loading, setLoading] = useState();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values);
      history.replace({ pathname: '/' });
    } catch (e) {
      setLoading(false);
      let message = '';
      switch (e.response.data.statusCode) {
        case 401: {
          message = 'Credenciales erroneas';
          break;
        }
        case 403: {
          message = 'No dispones de permisos para entrar al administrador';
          break;
        }
        default: {
          message = 'Algo salio mal';
          break;
        }
      }
      notification.error({ message });
    }
  };

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className=' p-10 bg-white rounded shadow-md'>
        <Form name='login' className='form' onFinish={onFinish}>
          <FormInput id='email' label='Email'>
            <Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar tu correo!',
                },
              ]}>
              <Input
                type='email'
                id='email'
                className='shadow'
                prefix={<Icon component={UserOutlined} />}
              />
            </Item>
          </FormInput>
          <FormInput id='password' label='Password'>
            <Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar tu contraseña!',
                },
              ]}>
              <Input
                type='password'
                id='password'
                className='shadow'
                prefix={<Icon component={LockOutlined} />}
              />
            </Item>
          </FormInput>
          <div className='flex justify-center'>
            <Item>
              <Button
                className='secundary-btn shadow'
                htmlType='submit'
                loading={loading}
                disabled={loading}>
                Log in
              </Button>
            </Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
