import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function Router() {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <Switch>
          {routes.map((props) => (
            <Route {...props} key={props.path} />
          ))}
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
