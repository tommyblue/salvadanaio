import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {loadAccounts} from '../actions';
import {formatMoney, formatISODate} from '../utils';
import LoadingSpinner from '../components/LoadingSpinner';

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
                {this.accountsTable()}
            </div>
        );
    }

    accountsTable() {
        if (_.isEmpty(this.props.accounts)) {
            return (<LoadingSpinner />);
        }
        return (
            <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Account name</th>
                        <th>Balance</th>
                        <th>Last balance update</th>
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.accounts, (a) => (
                    <tr key={`account_${a.id}`}>
                        <td>{a.name}</td>
                        <td>{formatMoney(a.balance)}</td>
                        <td>{formatISODate(a.balance_update_date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts);
