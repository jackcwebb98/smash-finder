import React from 'react';
import { Switch } from 'react-router-dom';
import routes from './routes';
import Route from './Route';

const Routes = () => {
  return (
    <Switch>
      {routes.map((props, key) => {
        return <Route key={key} {...props} />;
      })}
    </Switch>
  );
};

export default Routes;
