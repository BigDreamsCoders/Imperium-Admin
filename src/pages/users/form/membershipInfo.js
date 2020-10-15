import React from 'react';
import { useQuery } from 'react-query';
import { Form, Select } from 'antd';
import { FormInput } from '../../../components/formInput';
import { membershipsState, membershipsType } from '../../../services/api';
import constants from '../../../utils/constants';
import { FormWrapper } from './wrapper';

const { Item } = Form;
const { Option } = Select;

const fetchMembershipInfo = async () => {
  return await Promise.all([membershipsType(), membershipsState()]);
};

export const MembershipInfo = ({ form, next, prev }) => {
  const { isFetching, data } = useQuery('membership-info', fetchMembershipInfo);

  return (
    <FormWrapper
      form={form}
      hasNext={next}
      hasPrev={prev}
      title={`${constants.PAGES.NEW_USER.BASE} \u2022 ${constants.PAGES.NEW_USER.MEMBERSHIP}`}>
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
    </FormWrapper>
  );
};
