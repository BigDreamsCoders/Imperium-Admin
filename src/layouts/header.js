import React from 'react';
import { Layout } from 'antd';
import { Link, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RouteTransition } from 'components/routeTransition';
import { AdminMenu } from 'components/badge';

const { Header } = Layout;

export function MHeader({ location }) {
  return (
    <Header className='sticky top-0 w-full flex flex-row px-3 justify-between bg-primary'>
      <Link to='/'>
        <img
          className='justify-self-start h-full'
          src='/img/logo_darkbg.png'
          alt='coliseo de color amarillo, junto a el el nombre de Imperium '
        />
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
  );
}
