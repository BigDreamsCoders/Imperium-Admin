import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import Icon, { LockOutlined, UserOutlined } from '@ant-design/icons';
import { FormInput } from '../components/formInput';
import { updatePassword } from '../services/api/user';

const { Item } = Form;

export function ChangePass() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updatePassword(values);
      history.push('/');
    } catch (e) {
      let message = '';
      setLoading(false);
      switch (e.response.data.statusCode) {
        case 400: {
          message = 'Verifica tu contraseña';
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
          <FormInput id='password' label='Contraseña actual'>
            <Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar tu password actual!',
                },
              ]}>
              <Input
                type='password'
                id='password'
                className='shadow'
                prefix={<Icon component={UserOutlined} />}
              />
            </Item>
          </FormInput>
          <FormInput id='newPassword' label='Nueva contraseña'>
            <Item
              name='newPassword'
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar la nueva contraseña',
                },
              ]}>
              <Input
                type='password'
                id='new-password'
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
                Cambiar contraseña
              </Button>
            </Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
