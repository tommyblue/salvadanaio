import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import NavBar from './components/Navbar';
import Accounts from './containers/Accounts';
import Movements from './containers/Movements';

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavBar />
                    <Switch>
                        <Route path='/movements' component={Movements}/>
                        <Route path='/accounts' component={Accounts}/>
                        <Route component={Movements}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
