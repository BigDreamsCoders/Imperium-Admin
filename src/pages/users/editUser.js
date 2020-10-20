import React, { useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MSteps } from './components/steps';
import { editUserComponents } from './utils/stepsComponents';
import { getOneUser } from '../../services/api/user';
import { gender, roles } from '../../services/api/api';

const fetchInitialData = async (id) => {
  return await Axios.all([roles(), gender(), getOneUser(id)]);
};

export function EditUser() {
  const params = useParams();
  const [current, setCurrent] = useState(0);

  const { data, refetch } = useQuery('basic info', () =>
    fetchInitialData(params['id'])
  );

  return (
    <div className='h-full w-full flex flex-col justify-start items-center'>
      <MSteps
        current={current}
        onChange={(i) => {
          setCurrent(i);
          refetch();
        }}
        status='process'
      />
      <div className='relative py-4 w-full h-full flex justify-center items-center'>
        {editUserComponents(data)[current].component()}
      </div>
    </div>
  );
}
