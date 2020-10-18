import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gender, getOneUser, roles } from '../../services/api';
import { MSteps } from './components/steps';

const fetchInitialData = (id) => [roles(), gender(), getOneUser(id)];

export function EditUser() {
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
      <MSteps current={current} onChange={setCurrent} status='process' />
      <div className='relative py-4 w-full h-full flex justify-center items-center'></div>
    </div>
  );
}
