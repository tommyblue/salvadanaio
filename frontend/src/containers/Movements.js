import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {loadMovements, loadAccounts, selectAccount, selectDateRange} from '../actions';
import {formatMoney, formatISODate} from '../utils';
import AccountSelector from '../components/AccountSelector';
import DateRangeSelector from '../components/DateRangeSelector';
import LoadingSpinner from '../components/LoadingSpinner';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        movements: state.movements,
        selectedAccount: state.selectedAccount,
        selectedDateRange: state.selectedDateRange,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMovements: (account_id) => dispatch(loadMovements(account_id)),
        onLoadAccounts: () => dispatch(loadAccounts()),
        onSelectAccount: (account_id) => dispatch(selectAccount(account_id)),
        onSelectDateRange: (dateRange) => dispatch(selectDateRange(dateRange)),
    }
};
class Movements extends React.Component {
    componentDidMount() {
        this.props.onLoadAccounts();
        if (this.props.selectedAccount) {
            this.props.onLoadMovements({
                accountId: this.props.selectedAccount,
                dateRange: this.props.selectedDateRange,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedAccount !== nextProps.selectedAccount || this.props.selectedDateRange !== nextProps.selectedDateRange) {
            this.props.onLoadMovements({
                accountId: nextProps.selectedAccount,
                dateRange: nextProps.selectedDateRange
            });
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Movements</h1>
                <AccountSelector
                    accounts={this.props.accounts}
                    selectedAccount={this.props.selectedAccount}
                    onSelectAccount={this.props.onSelectAccount}
                />
                <DateRangeSelector
                    selectedDateRange={this.props.selectedDateRange}
                    onSelectDateRange={this.props.onSelectDateRange}
                />
                {this.movementsTable()}
            </div>
        );
    }

    movementsTable() {
        if (_.isEmpty(this.props.movements)) {
            return (<LoadingSpinner />);
        }
        return (
            <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Operation date</th>
                        <th>Value date</th>
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.movements, (m) => (
                    <tr key={`account_${m.id}`}>
                        <td>{m.short_description}</td>
                        <td>{formatMoney(m.amount)}</td>
                        <td>{formatISODate(m.operation_date)}</td>
                        <td>{formatISODate(m.value_date)}</td>
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
)(Movements);
