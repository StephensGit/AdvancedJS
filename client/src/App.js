import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/alert';
import MyShop from './components/myShop/MyShop';
import CreateCoffee from './components/coffee-forms/CreateCoffee';
import EditCoffee from './components/coffee-forms/EditCoffee';
import Coffees from './components/coffees/Coffees';
import Coffee from './components/coffee/Coffee';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux
// Provider comes from the react redux package, this connects react&redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section>
            <div className='container formEventsContainer'>
              <div className='row'>
                <Alert />
                <Switch>
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/coffees' component={Coffees} />
                  <Route exact path='/coffee/:id' component={Coffee} />
                  <PrivateRoute exact path='/myShop' component={MyShop} />
                  <PrivateRoute
                    exact
                    path='/create-coffee'
                    component={CreateCoffee}
                  />
                  <PrivateRoute
                    exact
                    path='/edit-coffee'
                    component={EditCoffee}
                  />
                </Switch>
                {/* </div> */}
              </div>
            </div>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
