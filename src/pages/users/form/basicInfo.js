import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import Icon from '@ant-design/icons';
import { useQuery } from 'react-query';
import { BsChevronRight } from 'react-icons/bs';
import { basicInfoItems } from './items';
import { FormInput } from '../../../components/formInput';
import { roles } from '../../../services/api';

const { Item } = Form;
const { Option } = Select;

export const BasicInfo = ({ form, next }) => {
  const { data, isFetching } = useQuery('role', roles);
  console.log(data);

  return (
    <div>
      <div className='relative p-10 bg-white rounded shadow-md'>
        <Form name='login' className='form' form={form}>
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
          <FormInput id='roleId' label='Rol'>
            <Item
              name='roleId'
              rules={[{ required: true, message: 'Debe seleccionar rol' }]}>
              <Select loading={isFetching}>
                {data &&
                  data.map(({ id, name }) => {
                    return (
                      <Option value={id} key={id}>
                        {name}
                      </Option>
                    );
                  })}
              </Select>
            </Item>
          </FormInput>
        </Form>
      </div>
      <Button
        className='absolute bottom-0 right-0 mr-10 mb-10 secundary-btn'
        shape='circle'
        size='large'
        icon={<Icon component={BsChevronRight} />}
        onClick={() => next()}
      />
    </div>
  );
};
