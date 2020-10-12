import React from 'react';
import { TeamOutlined, CarryOutOutlined } from '@ant-design/icons';
import { BiCloudLightning, BiStore } from 'react-icons/bi';
import { Card } from '../components/card';
import { Link } from 'react-router-dom';

const routes = [
  {
    icon: () => TeamOutlined,
    label: 'Usuarios',
    route: '/users',
  },
  {
    icon: () => BiCloudLightning,
    label: 'Maquinas',
    route: '/workstations',
  },
  {
    icon: () => CarryOutOutlined,
    label: 'Rutinas',
    route: '/routines',
  },
  {
    icon: () => BiStore,
    label: 'Servicios',
    route: '/services',
  },
];

export const Index = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h1 style={{ fontSize: '48px' }}>Administración</h1>
      <div className='flex justify-evenly flex-wrap w-full'>
        {routes.map((item, index) => (
          <Link to={item.route} key={index} className='m-12 text-thunder'>
            <Card label={item.label} icon={item.icon()} />
          </Link>
        ))}
      </div>
    </div>
  );
};
