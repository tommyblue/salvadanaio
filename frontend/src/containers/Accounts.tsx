import * as React from 'react';
import { connect } from 'react-redux';

import {
    deleteAccount,
    loadAccounts,
    saveAccount,
    toggleShowAccountsModal,
} from '../actions';
import AccountModal from '../components/AccountModal';
import AccountsTable from '../components/AccountsTable';
import {IGlobalState} from '../types';

interface IProps extends IGlobalState{
    loadAccounts: () => void;
    onDeleteAccount: (accountId: any) => void;
    onSaveAccount: (account: any) => void;
    onToggleShowAccountsModal: () => void;
}

const mapStateToProps = (state: IGlobalState) => {
    return {
        accounts: state.accounts,
        showAccountsModal: state.showAccountsModal,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadAccounts: () => (dispatch(loadAccounts())),
        onDeleteAccount: (accountId: any) => dispatch(deleteAccount(accountId)),
        onSaveAccount: (account: any) => dispatch(saveAccount(account)),
        onToggleShowAccountsModal: () => dispatch(toggleShowAccountsModal()),
    }
};

class Accounts extends React.Component<IProps, {}> {
    public componentDidMount() {
        this.props.loadAccounts();
    }

    public render() {
        return (
            <div className="container">
                <h1 className="title">Accounts</h1>
                <div className="columns">
                    <div className="column is-2 is-offset-10">
                        <AccountModal
                            onSaveAccount={this.props.onSaveAccount}
                            showModal={this.props.showAccountsModal}
                            toggleShowModal={this.props.onToggleShowAccountsModal}
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
