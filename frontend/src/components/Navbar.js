import React from 'react';
const logo = require('../images/logo.png');

export default class extends React.Component {
    render() {
        return (
            <nav className="navbar" aria-label="main navigation">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={logo} alt="Salvadanaio" />
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <a className="navbar-item">Accounts</a>
                            <a className="navbar-item">Movements</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
