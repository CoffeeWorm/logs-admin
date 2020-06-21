import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function Router() {
  return (
    <div>
      <Suspense fallback="">
        <BrowserRouter>
          <Switch>
            {routes.map((props) => (
              <Route {...props} key={props.path} />
            ))}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default Router;
