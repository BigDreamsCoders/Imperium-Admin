import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MountTransition } from './mountTransition';

export function RouteWithoutTransition({ path, exact, children, ...rest }) {
  return (
    <Route path={path} exact={exact} {...rest}>
      {children}
    </Route>
  );
}

export function RouteTransition({
  children,
  path,
  exact = false,
  slide = 0,
  slideUp = 0,
  ...rest
}) {
  return (
    <Route path={path} exact={exact} {...rest}>
      <MountTransition slide={slide} slideUp={slideUp} {...rest}>
        {children}
      </MountTransition>
    </Route>
  );
}

export function DeAnimatedRoutes({ children }) {
  return <Switch>{children}</Switch>;
}

export function AnimatedRoutes({
  children,
  exitBeforeEnter = false,
  initial = false,
  location,
}) {
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Switch location={location} key={location.pathname}>
        {children}
      </Switch>
    </AnimatePresence>
  );
}
