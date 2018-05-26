import * as React from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import {
    signIn,
} from '../actions';

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSignIn: (email: string, password: string) => dispatch(signIn(email, password)),
    };
};

class Login extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onSignIn = this.onSignIn.bind(this);
        this.state = {email: "", password: ""};
    }

    public render() {
        return (
            <div className="container">
                <h1 className="title">Login</h1>
                {this.props.isAuthenticated ? <Redirect to="/" /> : this.form()}
            </div>
        );
    }

    private form() {
        return (
            <form>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            placeholder="Your email address"
                            value={this.state.email}
                            autoFocus={true}
                            onChange={(e) => this.setState({...this.state, email: e.target.value})}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={(e) => this.setState({...this.state, password: e.target.value})}
                        />
                    </div>
                </div>

                <button
                    className="button is-primary"
                    onClick={this.onSignIn}
                >Sign in</button>
            </form>
        );
    }

    private onSignIn() {
        this.props.onSignIn(this.state.email, this.state.password);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
