import React from 'react';
import { Route } from 'umi';
import Redirect from 'umi/redirect';
import { getAuthInfo } from '@/utils/saveAuth';

const AuthRouter = (props) => {
  const { route } = props;
  const { component: Component } = route;
  const { Authorization } = getAuthInfo();
  return (
    <Route
      render={() => {
        return Authorization ? <Component {...props} /> : <Redirect to="/user/login" />;
      }}
    />
  );
};

export default AuthRouter;
