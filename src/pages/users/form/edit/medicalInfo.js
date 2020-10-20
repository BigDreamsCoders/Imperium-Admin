import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { FormInput } from '../../../../components/formInput';
import { FormWrapper } from './wrapper';
import { updateFile } from '../../../../services/api/user';

const { Item } = Form;

const initialValues = (user) => ({
  height: user.file.height,
  weight: user.file.weight,
});

export function MedicalInfo({ user }) {
  const onFinish = async (values) => {
    try {
      await updateFile(user.file.id, {
        height: Number(values.height),
        weight: Number(values.weight),
      });
      notification.success({
        message: 'El usuario se actualizó correctamente',
      });
    } catch (e) {
      if (e.response) {
        switch (e.response.data.statusCode) {
          default: {
            notification.error({ message: 'Ocurrio un error inesperado' });
            break;
          }
        }
      }
    }
  };

  return (
    <FormWrapper user={user}>
      <Form
        initialValues={user ? initialValues(user) : {}}
        className='form'
        onFinish={onFinish}>
        <FormInput id='height' label='Altura'>
          <Item
            name='height'
            rules={[
              {
                required: true,
                message: 'Debe ingresar la altura',
              },
            ]}>
            <Input
              type={'number'}
              id={'height'}
              className='shadow'
              suffix='Mts.'
            />
          </Item>
        </FormInput>
        <FormInput id='weight' label='Peso'>
          <Item
            name='weight'
            rules={[{ required: true, message: 'Debe ingresar el peso' }]}>
            <Input
              type={'number'}
              id={'weight'}
              className='shadow'
              suffix='Kg.'
            />
          </Item>
        </FormInput>
        <Item className='fixed bottom-0 right-0 mr-4 mb-2'>
          <Button
            className='flex justify-center items-center secundary-btn'
            size='large'
            htmlType='submit'>
            Actualizar
          </Button>
        </Item>
      </Form>
    </FormWrapper>
  );
}
