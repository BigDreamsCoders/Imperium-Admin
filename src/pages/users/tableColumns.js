import React from 'react';
import { Tag } from 'antd';
import constants from '../../utils/constants';

export const columns = [
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
    render: (id) => {
      return (
        <span>
          <Tag>{id}</Tag>
        </span>
      );
    },
  },
];
