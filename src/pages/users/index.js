import React from 'react';
import { UserTable } from './userTable';
import {
  DeAnimatedRoutes,
  RouteTransition,
} from '../../components/routeTransition';
import { NewUser } from './newUser';
import { EditUser } from './editUser';
import { ViewUser } from './viewUser';

export function UserIndex() {
  return (
    <DeAnimatedRoutes>
      <RouteTransition exact path='/users'>
        <UserTable />
      </RouteTransition>
      <RouteTransition exact path='/users/new'>
        <NewUser />
      </RouteTransition>
      <RouteTransition exact path='/users/edit/:id'>
        <EditUser />
      </RouteTransition>
      <RouteTransition exact path='/users/:id'>
        <ViewUser />
      </RouteTransition>
    </DeAnimatedRoutes>
  );
}
