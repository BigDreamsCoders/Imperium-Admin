import React from 'react';
import { Form, Input } from 'antd';
import { FormInput } from '../../../components/formInput';
import constants from '../../../utils/constants';
import { FormWrapper } from './wrapper';

const { Item } = Form;

export const MedicalInfo = ({ form, prev, finish }) => {
  return (
    <FormWrapper
      form={form}
      hasPrev={prev}
      hasFinish={finish}
      title={`${constants.PAGES.NEW_USER.BASE} \u2022 ${constants.PAGES.NEW_USER.MEDIC_FILE}`}>
      <FormInput id='weight' label='Tipo'>
        <Item
          name='weight'
          rules={[
            { required: true, message: 'Debe seleccionar tipo de membresia' },
          ]}>
          <Input
            type={'number'}
            id={'weight'}
            className='shadow'
            /* prefix={<Icon component={item.icon} />} */
          />
        </Item>
      </FormInput>
      <FormInput id='height' label='Estado'>
        <Item
          name='height'
          rules={[
            {
              required: true,
              message: 'Debe seleccionar estado de la membresia',
            },
          ]}>
          <Input
            type={'number'}
            id={'height'}
            className='shadow'
            /* prefix={<Icon component={item.icon} />} */
          />
        </Item>
      </FormInput>
    </FormWrapper>
  );
};
