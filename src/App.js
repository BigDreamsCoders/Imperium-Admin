import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Link, Switch, useHistory, useLocation } from 'react-router-dom';
import { Login } from './pages/login';
import { AdminMenu } from './components/badge';
import { Index } from './pages';
import { AnimatedRoutes, RouteTransition } from './components/routeTransition';
import { UserIdex } from './pages/users';
import { AnimatePresence } from 'framer-motion';
import { me } from './services/api';
import { NewUser } from './pages/users/newUser';
import { ChangePass } from './pages/changePass';
import { ViewUser } from './pages/users/viewUser';
import { EditUser } from './pages/users/editUser';
import {
  releaseAxiosInterceptors,
  setUpAxiosInterceptors,
} from './services/axios';
import { ErrorPage } from './pages/error';

const { Header, Content } = Layout;

export const App = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setUpAxiosInterceptors(history);
    return () => {
      releaseAxiosInterceptors();
    };
  }, [history]);

  useEffect(() => {
    const validate = async () => {
      try {
        await me();
      } catch (e) {
        if (e?.response?.data) {
          switch (e.response.data.statusCode) {
            case 401:
            case 403:
            default: {
              history.replace('/login', { login: true });
              break;
            }
          }
        }
      }
    };
    if (location.pathname !== '/login' && location.pathname !== '/error')
      validate();
  }, [history, location]);
  return (
    <Layout className='layout min-h-screen max-w-full'>
      <Header
        style={{ backgroundColor: '#282f44' }}
        className='sticky top-0 w-full flex flex-row px-3 justify-between'>
        <Link to='/'>
          <h1 className='text-white justify-self-start'>Imperium</h1>
        </Link>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch
            location={location}
            key={location.pathname === '/login' ? 'login' : 'admin-menu'}>
            <RouteTransition exact path='/login' />
            <RouteTransition exact path='/*' slideUp={15} isMain={false}>
              <AdminMenu />
            </RouteTransition>
          </Switch>
        </AnimatePresence>
      </Header>
      <Content className='sm:min-h-full md:h-full flex'>
        <AnimatedRoutes exitBeforeEnter initial={true} location={location}>
          <RouteTransition exact path='/login' slideUp={15}>
            <Login />
          </RouteTransition>
          <RouteTransition exact path='/reset-psw' slideUp={15}>
            <ChangePass />
          </RouteTransition>
          <RouteTransition exact path='/users' slideUp={15}>
            <UserIdex />
          </RouteTransition>
          <RouteTransition exact path='/users/new' slideUp={15}>
            <NewUser />
          </RouteTransition>
          <RouteTransition exact path='/users/edit/:id' slideUp={15}>
            <EditUser />
          </RouteTransition>
          <RouteTransition exact path='/users/:id' slideUp={15}>
            <ViewUser />
          </RouteTransition>
          <RouteTransition exact path='/error' slide={15}>
            <ErrorPage />
          </RouteTransition>
          <RouteTransition path='/' slideUp={15}>
            <Index />
          </RouteTransition>
        </AnimatedRoutes>
      </Content>
    </Layout>
  );
};
