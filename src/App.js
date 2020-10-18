import React, { useEffect } from 'react';
import { Link, Switch, useHistory, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { AnimatePresence } from 'framer-motion';
import { AdminMenu } from './components/badge';
import { AnimatedRoutes, RouteTransition } from './components/routeTransition';
import { Index } from './pages';
import { Login } from './pages/login';
import { UserIdex } from './pages/users';
import { NewUser } from './pages/users/newUser';
import { ViewUser } from './pages/users/viewUser';
import { EditUser } from './pages/users/editUser';
import { ChangePass } from './pages/changePass';
import { ErrorPage } from './pages/error';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import {
  releaseAxiosInterceptors,
  setUpAxiosInterceptors,
} from './services/axios';
import { me } from './services/api';

const { Header, Content } = Layout;

export const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [online] = useOnlineStatus();

  useEffect(() => {
    setUpAxiosInterceptors(history, location);
    return () => {
      releaseAxiosInterceptors();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    const { state } = location;
    if (state?.prevLocation) {
      history.replace({ pathname: state.prevLocation, state: {} });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (online) {
      //Check if the client is online again
      if (location.pathname === '/error') {
        const prevLocation = location.state.prevLocation;
        if (prevLocation) {
          //If there is a prevLocation state, then replace to that location
          switch (prevLocation) {
            case '/error': {
              history.replace({
                pathname: '/',
                state: {},
              });
              break;
            }
            default: {
              history.replace({
                pathname: prevLocation,
                state: { prevLocation: location.pathname, conn: true },
              });
            }
          }
        } else {
          history.replace({
            pathname: '/',
            state: {},
          });
        }
      }
    } else {
      // If client goes offline then we redirect to error page
      history.replace({
        pathname: '/error',
        state: { prevLocation: location.pathname, conn: true },
      });
    }
  }, [online]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout className='min-h-screen max-h-screen overflow-hidden max-w-full'>
      <Header className='sticky top-0 w-full flex flex-row px-3 justify-between bg-primary'>
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
      <Content className='sm:h-full md:min-h-full overflow-auto flex'>
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
          <RouteTransition exact path='/error' slideUp={15}>
            <ErrorPage />
          </RouteTransition>
          <RouteTransition exact path='/' slideUp={15}>
            <Index />
          </RouteTransition>
          <RouteTransition path='/' slideUp={15}>
            <ErrorPage />
          </RouteTransition>
        </AnimatedRoutes>
      </Content>
    </Layout>
  );
};
