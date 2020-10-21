import React from 'react';
import { Form, Input } from 'antd';
import { FormInput } from 'components/formInput';
import constants from 'utils/constants';
import { FormWrapper } from './wrapper';

const { Item } = Form;

export function MedicalInfo({ form, prev, finish }) {
  return (
    <FormWrapper
      form={form}
      hasPrev={prev}
      hasFinish={finish}
      title={`${constants.PAGES.NEW_USER.BASE} \u2022 ${constants.PAGES.NEW_USER.MEDIC_FILE}`}>
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
    </FormWrapper>
  );
}
