import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.isAuthenticated,
    };
};

interface IProps {
    isAuthenticated: boolean;
}

class PrivateRoute extends React.Component<IProps, any> {
    public render() {
        if (!this.props.isAuthenticated) {
            return (
                <Redirect
                    to={{
                    pathname: "/login",
                    }}
                />
            );
        }

        return (
            <span>{this.props.children}</span>
        );
    }
}

export default connect(mapStateToProps)(PrivateRoute);
