import React from 'react';
import _ from 'lodash';

export default class extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (_.isEmpty(nextProps.selectedAccount) && nextProps.accounts.length > 0) {
            nextProps.onSelectAccount(nextProps.accounts[0].id);
        }
    }

    render() {
        const { accounts, selectedAccount, onSelectAccount } = this.props;
        return (
            <div className="select is-left">
                <select value={selectedAccount} onChange={(e) => (onSelectAccount(e.target.value))}>
                    {_.map(accounts, (a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}
