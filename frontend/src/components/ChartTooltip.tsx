import * as _ from 'lodash';
import * as React from 'react';

import { formatCurrency, formatDate } from '../utils';

export default class ChartTooltip extends React.Component<any, any> {
    public render() {
        const { active } = this.props;
        const finalStyle: any = {
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            margin: 0,
            padding: 10,
            whiteSpace: 'nowrap',
          };
          const finalLabelStyle: any = {
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '1em',
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
                                    paddingBottom: 4,
                                    paddingTop: 4,
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
