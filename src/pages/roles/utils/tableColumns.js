import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const columns = () => {
  return [
    {
      title: 'Nombre',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Cantidad de privilegios',
      dataIndex: 'privilege',
      responsive: ['md'],
      align: 'center',
      render: (privilege) => {
        return <span>{privilege.length}</span>;
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      align: 'center',
      render: (id, row) => {
        return (
          <div className=''>
            <Link to={(location) => `${location.pathname}/edit/${id}`}>
              <Button className='mx-1'>Editar</Button>
            </Link>
          </div>
        );
      },
    },
  ];
};
