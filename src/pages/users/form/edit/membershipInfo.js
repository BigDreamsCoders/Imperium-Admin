import React from 'react';
import Axios from 'axios';
import { Button, Form, notification, Select } from 'antd';
import { useQuery } from 'react-query';
import { FormWrapper } from './wrapper';
import {
  membershipsState,
  membershipsType,
  updateMemebershipState,
  updateMemebershipType,
} from '../../../../services/api/api';
import { FormInput } from '../../../../components/formInput';

const { Item } = Form;
const { Option } = Select;

const fetchMembershipInfo = async () => {
  return await Axios.all([membershipsType(), membershipsState()]);
};

const updateData = async (id, { type, state }) => {
  return await Axios.all([
    updateMemebershipState(id, state),
    updateMemebershipType(id, type),
  ]);
};

const initialValues = (user) => ({
  type: user.membership.membershipType.id,
  state: user.membership.membershipState.id,
});

export function MembershipInfo({ user }) {
  const { isFetching, data } = useQuery('membership-info', fetchMembershipInfo);
  const onFinish = async (values) => {
    try {
      await updateData(user.membership.id, values);
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
    <FormWrapper user={data} callback={onFinish}>
      <Form
        initialValues={user ? initialValues(user) : {}}
        className='form'
        onFinish={onFinish}>
        <FormInput id='type' label='Tipo'>
          <Item
            name='type'
            rules={[
              { required: true, message: 'Debe seleccionar tipo de membresia' },
            ]}>
            <Select loading={isFetching}>
              {data &&
                data[0].map(({ id, name }) => {
                  return (
                    <Option value={id} key={id}>
                      {name}
                    </Option>
                  );
                })}
            </Select>
          </Item>
        </FormInput>
        <FormInput id='state' label='Estado'>
          <Item
            name='state'
            rules={[
              {
                required: true,
                message: 'Debe seleccionar estado de la membresia',
              },
            ]}>
            <Select loading={isFetching}>
              {data &&
                data[1].map(({ id, name }) => {
                  return (
                    <Option value={id} key={id}>
                      {name}
                    </Option>
                  );
                })}
            </Select>
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
