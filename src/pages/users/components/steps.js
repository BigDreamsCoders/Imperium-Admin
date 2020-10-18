import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

export function MSteps({ current, onChange, status }) {
  return (
    <Steps type='navigation' current={current} onChange={onChange}>
      <Step title='Informacion básica' status={status} />
      <Step title='Membresía' status={status} />
      <Step title='Ficha Médica' status={status} />
    </Steps>
  );
}
