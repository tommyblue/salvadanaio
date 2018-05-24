import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NavBar from './components/Navbar';
import Notification from './containers/Notification';
import Accounts from './containers/Accounts';
import Dashboard from './containers/Dashboard';
import Movements from './containers/Movements';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Notification />
                    <NavBar />
                    <Switch>
                        <Route path='/login' component={Login} />
                        <PrivateRoute path='/movements' component={Movements}/>
                        <PrivateRoute path='/accounts' component={Accounts}/>
                        <PrivateRoute component={Dashboard}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
