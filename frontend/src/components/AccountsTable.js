import React from 'react';
import _ from 'lodash';

import LoadingSpinner from './LoadingSpinner';
import {formatMoney, formatISODate} from '../utils';

export default class extends React.Component {
    render() {
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
