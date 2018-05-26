import * as React from 'react';
import {Link} from 'react-router-dom';

// tslint:disable:no-var-requires
const logo = require('../images/logo.png');

export default class extends React.Component<any, any> {
    public render() {
        return (
            <nav className="navbar" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={logo} alt="Salvadanaio" />
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">Dashboard</Link>
                            <Link to="/accounts" className="navbar-item">Accounts</Link>
                            <Link to="/movements" className="navbar-item">Movements</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
