import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MountTransition } from './mountTransition';

export const RouteTransition = ({
  children,
  path,
  exact = false,
  slide = 0,
  slideUp = 0,
  ...rest
}) => (
  <Route path={path} exact={exact} {...rest}>
    <MountTransition slide={slide} slideUp={slideUp} {...rest}>
      {children}
    </MountTransition>
  </Route>
);

export const AnimatedRoutes = ({
  children,
  exitBeforeEnter = false,
  initial = false,
  location,
}) => {
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};
