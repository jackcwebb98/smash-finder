import React from 'react';
import { Route } from 'react-router-dom';

const RouteItem = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Component {...props} />;
    }}
  />
);

export default RouteItem;
