import React from 'react';
import { Button, Tag } from 'antd';
import constants from '../../../utils/constants';
import { Link } from 'react-router-dom';

export const columns = (deleteCallback) => {
  return [
    {
      title: 'Nombre',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Estado de la membresia',
      dataIndex: 'membership',
      key: 'membership',
      align: 'center',
      render: (membership) => {
        const name = membership.membershipState.name;
        let color =
          name === constants.MEMBERSHIP_STATE.ACTIVE ? 'green' : 'yellow';
        color = name === constants.MEMBERSHIP_STATE.OVERDUE ? 'volcano' : color;
        return (
          <span>
            <Tag color={color}>{name}</Tag>
          </span>
        );
      },
    },
    {
      title: 'Acciones',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id, row) => {
        return (
          <div className=''>
            <Link to={(location) => `${location.pathname}/${id}`}>
              <Button className='mx-1'>Ver</Button>
            </Link>
            <Link to={(location) => `${location.pathname}/edit/${id}`}>
              <Button className='mx-1'>Editar</Button>
            </Link>
            <Button
              danger
              className='ml-3'
              onClick={() => deleteCallback({ name: row.fullName, id })}>
              Eliminar
            </Button>
          </div>
        );
      },
    },
  ];
};
