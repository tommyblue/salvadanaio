import * as React from 'react';
import { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';

import NavBar from './components/Navbar';
import Accounts from './containers/Accounts';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Movements from './containers/Movements';
import Notification from './containers/Notification';
import PrivateRoute from './containers/PrivateRoute';

import './App.css';

class App extends Component {
    public render() {
        return (
            <Router>
                <div>
                    <Notification />
                    <NavBar />
                    <Switch>
                        <Route path='/login' component={Login} />
                        <PrivateRoute>
                            <Route component={Movements} path='/movements' />
                            <Route component={Accounts} path='/accounts' />
                            <Route component={Dashboard} />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
