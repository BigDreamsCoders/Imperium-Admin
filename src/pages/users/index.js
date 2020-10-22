import React from 'react';
import { GiPoliceBadge } from 'react-icons/gi';
import { TeamOutlined } from '@ant-design/icons';
import { UserTable } from './userTable';
import { NewUser } from './newUser';
import { EditUser } from './editUser';
import { EditRole } from './../roles/editRole';
import { ViewUser } from './viewUser';
import { NewRole } from '../roles/newRole';
import { DeAnimatedRoutes, RouteTransition } from 'components/routeTransition';
import { CardPanel } from 'components/card';
import { RoleTable } from 'pages/roles/roleTable';

const userPrefix = '/users/admin';

const routes = [
  {
    icon: () => TeamOutlined,
    label: 'Usuarios',
    route: userPrefix,
  },
  {
    icon: () => GiPoliceBadge,
    label: 'Roles',
    route: '/users/roles',
  },
];

export function UserIndex() {
  return (
    <DeAnimatedRoutes>
      <RouteTransition exact path='/users'>
        <CardPanel title='Administración de Usuarios' routes={routes} />
      </RouteTransition>
      <RouteTransition exact path={`/users/roles`}>
        <RoleTable />
      </RouteTransition>
      <RouteTransition exact path={`/users/roles/new`}>
        <NewRole />
      </RouteTransition>
      <RouteTransition exact path={`/users/roles/edit/:id`}>
        <EditRole />
      </RouteTransition>
      <RouteTransition exact path={userPrefix}>
        <UserTable />
      </RouteTransition>
      <RouteTransition exact path={`${userPrefix}/new`}>
        <NewUser />
      </RouteTransition>
      <RouteTransition exact path={`${userPrefix}/edit/:id`}>
        <EditUser />
      </RouteTransition>
      <RouteTransition exact path={`${userPrefix}/:id`}>
        <ViewUser />
      </RouteTransition>
    </DeAnimatedRoutes>
  );
}
