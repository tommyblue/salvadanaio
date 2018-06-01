import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {IGlobalState} from '../types';

const mapStateToProps = (state: IGlobalState) => {
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

        return this.props.children;
    }
}

export default connect(mapStateToProps)(PrivateRoute);
