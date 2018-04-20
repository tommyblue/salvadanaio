import _ from 'lodash';
import React from 'react';

import { formatDate, formatCurrency } from '../utils';

export default class ChartTooltip extends React.Component {
    render() {
        const { active } = this.props;
        const finalStyle = {
            margin: 0,
            padding: 10,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            whiteSpace: 'nowrap',
          };
          const finalLabelStyle = {
            margin: 0,
            marginBottom: '1em',
            fontWeight: 'bold',
          };
        if (active) {
            const { payload, label, showTotal } = this.props;
            return (
                <div className="recharts-default-tooltip" style={finalStyle}>
                    <p className="recharts-tooltip-label" style={finalLabelStyle}>{formatDate(label)}</p>
                    <ul className="recharts-tooltip-item-list" style={{ padding: 0, margin: 0 }}>
                        {showTotal ?
                            <li className="recharts-tooltip-item">
                                Total: {formatCurrency(_.sum(_.map(payload, p => p.value)))}
                            </li>
                        : ''
                        }
                        {_.map(payload, (p) => (
                            <li
                                className="recharts-tooltip-item"
                                key={p.name}
                                style={{
                                    color: p.color,
                                    display: 'block',
                                    paddingTop: 4,
                                    paddingBottom: 4,
                                }}
                            >
                                <span className="recharts-tooltip-item-name">
                                    {_.capitalize(p.name)}
                                </span>
                                <span className="recharts-tooltip-item-separator">: </span>
                                <span className="recharts-tooltip-item-value">
                                    {formatCurrency(p.value, p.unit)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    }
}
