import * as _ from 'lodash';
import * as React from 'react';

import {formatISODate, formatMoney} from '../utils';

export default class extends React.Component<any, any> {
    public render() {
        return (
            <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Account name</th>
                        <th>Balance</th>
                        <th>Last balance update</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.accounts, (a) => (
                    <tr key={`account_${a.id}`}>
                        <td>{a.name}</td>
                        <td>{formatMoney(a.balance)}</td>
                        <td>{formatISODate(a.balance_update_date)}</td>
                        <td>
                            <a
                                className="button is-small is-danger"
                                onClick={this.props.onDeleteAccount.bind(this, a.id)}
                                title="Delete"
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-trash-alt" />
                                </span>
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
