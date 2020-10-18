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
      <RouteTransition exact path='/users' slideUp={5}>
        <UserTable />
      </RouteTransition>
      <RouteTransition exact path='/users/new' slideUp={5}>
        <NewUser />
      </RouteTransition>
      <RouteTransition exact path='/users/edit/:id' slideUp={15}>
        <EditUser />
      </RouteTransition>
      <RouteTransition exact path='/users/:id' slideUp={15}>
        <ViewUser />
      </RouteTransition>
    </DeAnimatedRoutes>
  );
}
