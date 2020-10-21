import React from 'react';
import moment from 'moment';
import Icon from '@ant-design/icons';
import { Button, Form, Input, notification, Select } from 'antd';
import { FormInput } from 'components/formInput';
import { basicInfoItems } from '../new/items';
import { FormWrapper } from './wrapper';
import { updateUserBasicInfor } from 'services/api/user';

const { Item } = Form;
const { Option } = Select;

const initialValues = (user) => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  birthday: moment(user.birthday).format('YYYY-MM-D'),
  genderId: user.gender.id,
  roleId: user.role.id,
});

export function BasicInfo({ gender, role, user }) {
  const onFinish = async (values) => {
    try {
      await updateUserBasicInfor(user.id, {
        ...values,
        birthday: new Date(values.birthday).toISOString(),
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
    <FormWrapper user={user} callback={onFinish}>
      <Form
        initialValues={user ? initialValues(user) : {}}
        className='form flex flex-col sm:flex-row sm:gap-8 sm:w-auto'
        onFinish={onFinish}>
        <div className='px-5'>
          {basicInfoItems.map((item) => (
            <FormInput id={item.id} label={item.label} key={item.id}>
              <Item name={item.id} rules={item.rules}>
                <Input
                  type={item.type}
                  id={item.id}
                  className='shadow'
                  prefix={<Icon component={item.icon} />}
                />
              </Item>
            </FormInput>
          ))}
        </div>
        <div className='px-5 sm:self-center'>
          <FormInput id='birthday' label='Fecha de nacimiento'>
            <Item
              name='birthday'
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar la fecha de nacimiento del usuario',
                },
              ]}>
              <Input type='date' id='birthday' className='shadow' />
            </Item>
          </FormInput>
          <FormInput id='genderId' label='Genero'>
            <Item
              className='sm:w-auto'
              name='genderId'
              rules={[{ required: true, message: 'Debe seleccionar genero' }]}>
              <Select>
                {gender &&
                  gender.map(({ id, name }) => {
                    return (
                      <Option value={id} key={id}>
                        {name}
                      </Option>
                    );
                  })}
              </Select>
            </Item>
          </FormInput>
          <FormInput id='roleId' label='Rol'>
            <Item
              name='roleId'
              rules={[{ required: true, message: 'Debe seleccionar rol' }]}>
              <Select>
                {role &&
                  role.map(({ id, name }) => {
                    return (
                      <Option value={id} key={id}>
                        {name}
                      </Option>
                    );
                  })}
              </Select>
            </Item>
          </FormInput>
        </div>
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
