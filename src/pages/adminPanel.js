import React from 'react';
import { TeamOutlined, CarryOutOutlined } from '@ant-design/icons';
import { BiCloudLightning, BiStore } from 'react-icons/bi';
import { CardPanel } from '../components/card';

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

export function AdminPanel() {
  return <CardPanel title='Administración' routes={routes} />;
}
