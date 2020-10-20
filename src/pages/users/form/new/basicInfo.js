import React from 'react';
import Axios from 'axios';
import { useQuery } from 'react-query';
import Icon from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { FormWrapper } from './wrapper';
import { basicInfoItems } from './items';
import { FormInput } from '../../../../components/formInput';
import { gender, roles } from '../../../../services/api/api';
import constants from '../../../../utils/constants';

const { Item } = Form;
const { Option } = Select;

const fetchCatalogInfo = async () => {
  return await Axios.all([roles(), gender()]);
};

export function BasicInfo({ form, next }) {
  const { data, isFetching } = useQuery('basic-info', fetchCatalogInfo);

  return (
    <FormWrapper
      form={form}
      hasNext={next}
      title={`${constants.PAGES.NEW_USER.BASE} \u2022 ${constants.PAGES.NEW_USER.BASIC_INFO}`}>
      <div className='px-5'>
        {basicInfoItems.map((item) => {
          return (
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
          );
        })}
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
            name='genderId'
            rules={[{ required: true, message: 'Debe seleccionar genero' }]}>
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
        <FormInput id='roleId' label='Rol'>
          <Item
            name='roleId'
            rules={[{ required: true, message: 'Debe seleccionar rol' }]}>
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
      </div>
    </FormWrapper>
  );
}
