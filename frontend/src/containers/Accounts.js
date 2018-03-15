import React from 'react';
import { connect } from 'react-redux';

import {
    deleteAccount,
    loadAccounts,
    saveAccount,
    toggleShowAccountsModal,
} from '../actions';
import AccountsTable from '../components/AccountsTable';
import AccountModal from '../components/AccountModal';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        showAccountsModal: state.showAccountsModal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAccounts: () => (dispatch(loadAccounts())),
        onSaveAccount: (account) => dispatch(saveAccount(account)),
        onToggleShowAccountsModal: () => dispatch(toggleShowAccountsModal()),
        onDeleteAccount: (account_id) => dispatch(deleteAccount(account_id)),
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
                <div className="columns">
                    <div className="column is-2 is-offset-10">
                        <AccountModal
                            showModal={this.props.showAccountsModal}
                            toggleShowModal={this.props.onToggleShowAccountsModal}
                            accounts={this.props.accounts}
                            onSaveAccount={this.props.onSaveAccount}
                        />
                    </div>
                </div>
                <AccountsTable
                    accounts={this.props.accounts}
                    onDeleteAccount={this.props.onDeleteAccount}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts);
