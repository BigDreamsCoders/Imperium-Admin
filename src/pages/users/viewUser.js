import React, { useEffect } from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { getOneUser } from 'services/api/user';

export function ViewUser() {
  const params = useParams();

  const { data, isFetching, error } = useQuery('user', () => {
    return getOneUser(params.id);
  });

  console.log(data);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <div className='relative min-h-full w-full flex flex-col justify-center items-center'>
        {isFetching && (
          <div className='absolute min-h-full w-full flex flex-col justify-center items-center bg-gray-700 opacity-25'>
            <Spin indicator={() => <LoadingOutlined spin />} />
          </div>
        )}
        {data && (
          <div className=' bg-white rounded shadow-md p-5'>
            <h1 className='font-bold text-center' style={{ fontSize: '24px' }}>
              Información de usuario
            </h1>
            <div className='flex flex-col sm:flex-row justify-between flex-grow my-3'>
              <div className='mx-5 sm:my-3 '>
                <div>
                  <h2 className='font-bold text-center'>Info. Basica</h2>
                </div>
                <div>
                  <p>
                    Nombre:{' '}
                    <span className='font-medium'>{data?.firstName}</span>
                  </p>
                  <p>
                    Apellido:{' '}
                    <span className='font-medium'>{data?.lastName}</span>
                  </p>
                  <p>
                    Genero:{' '}
                    <span className='font-medium'>{data?.gender?.name}</span>
                  </p>
                  <p>
                    F. de nacimiento:{' '}
                    <span className='font-medium'>
                      {moment(data?.birthday).format('L')}
                    </span>
                  </p>
                  <p>
                    Rol: <span className='font-medium'>{data?.role?.name}</span>
                  </p>
                </div>
              </div>
              <div className='mx-5 sm:my-3'>
                <div>
                  <h2 className='font-bold text-center'>Membresia</h2>
                </div>
                <div>
                  <p>
                    Tipo:{' '}
                    <span className='font-medium'>
                      {data?.membership?.membershipType.name}
                    </span>
                  </p>
                  <p>
                    Estado:{' '}
                    <span className='font-medium'>
                      {data?.membership?.membershipState.name}
                    </span>
                  </p>
                </div>
              </div>
              <div className='mx-5 sm:my-3'>
                <div>
                  <h2 className='font-bold text-center'>Ficha médica</h2>
                </div>
                <div>
                  <p>
                    Altura:{' '}
                    <span className='font-medium'>{data?.file?.height}</span>{' '}
                    metros.
                  </p>
                  <p>
                    Peso:{' '}
                    <span className='font-medium'>{data?.file?.weight}</span>{' '}
                    kg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <Button
          className='fixed flex justify-center items-center bottom-0 right-0 mr-2 mb-2 secundary-btn'
          shape='circle'
          size='large'
          icon={<EditOutlined />}
        />
      </div>
    </>
  );
}
