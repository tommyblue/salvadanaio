import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
    };
};

class PrivateRoute extends React.Component {
    render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: this.props.location }
                    }}
                />
            );
        }

        return (
            <Route component={this.props.Component} {...this.props} />
        );
    }
}

export default connect(mapStateToProps)(PrivateRoute);
