import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <AuthWrapper>
      <Switch>
        {/* Switch renders the first child route that matches */}
        <PrivateRoute path="/" exact={true} component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path='*' component={Error} />
      </Switch>
    </AuthWrapper>
  );
}

export default App;
