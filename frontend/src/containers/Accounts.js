import React from 'react';
import { connect } from 'react-redux';

import {loadAccounts} from '../actions';
import AccountsTable from '../components/AccountsTable';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAccounts: () => {
            dispatch(loadAccounts())
        }
    }
};

class Accounts extends React.Component {
    componentDidMount() {
        this.props.loadAccounts();
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Accounts</h1>
                <AccountsTable accounts={this.props.accounts} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts);
