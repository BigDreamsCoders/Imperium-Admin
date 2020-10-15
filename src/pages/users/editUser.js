import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { useParams } from 'react-router-dom';
import { gender, getOneUser, roles } from '../../services/api';

const { Step } = Steps;

const fetchInitialData = (id) => [roles(), gender(), getOneUser(id)];

export const EditUser = () => {
  // const [user, setUser] = useState({});
  const [current, setCurrent] = useState(0);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const [roles, gender, user] = await Promise.all(fetchInitialData());
      console.log(roles, gender, user);
    })();
  }, [params]);
  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <Steps type='navigation' current={current} onChange={setCurrent}>
        <Step title='Informacion básica' status='process' />
        <Step title='Membresía' status='process' />
        <Step title='Ficha Médica' status='process' />
      </Steps>
      <div className='relative py-4 w-full h-full flex justify-center items-center'></div>
    </div>
  );
};
