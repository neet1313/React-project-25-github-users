import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      {/* Switch renders the first child route that matches */}
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path='*' component={Error} />
    </Switch>
  );
}

export default App;
