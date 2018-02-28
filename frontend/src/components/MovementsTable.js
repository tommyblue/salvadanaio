import React from 'react';
import _ from 'lodash';

import Tag from '../components/Tag';
import {formatMoney, formatISODate} from '../utils';

export default class extends React.Component {
    render() {
        return (
            <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Operation date</th>
                        <th>Value date</th>
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.movements, (m) => (
                    <tr key={`account_${m.id}`}>
                        <td>
                            {this.showDescription(m)}
                        </td>
                        <td>{this.showCategory(m.category)}</td>
                        <td>{formatMoney(m.amount)}</td>
                        <td>{formatISODate(m.operation_date)}</td>
                        <td>{formatISODate(m.value_date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    showDescription(movement) {
        const description = movement.description ? (
            <span
                className="movement-description tooltip is-tooltip-multiline"
                data-tooltip={movement.description}
            >
                <i className="fas fa-info-circle" />
            </span>) : "";
        return (
            <span>
                {movement.short_description}
                {description}
            </span>
        );
    }

    showCategory(category) {
        if (category) {
            return (<Tag title={category.title} />);
        }
        return "";
    }
}
