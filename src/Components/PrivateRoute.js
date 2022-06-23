import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { getContext } from '../utils/helpers/appContext';

export default function PrivateRoute({ render: RouteComponent, ...rest }) {
  const user = getContext('user');

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? <RouteComponent {...routeProps} /> : <Redirect to={'/home'} />
      }
    />
  );
}
