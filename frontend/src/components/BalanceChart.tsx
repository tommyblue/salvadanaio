import * as _ from 'lodash';
import * as React from 'react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { int2Money } from '../utils';
import ChartTooltip from './ChartTooltip';

export default class extends React.Component<any, any> {
    private chartColors = ["#D70918", "#282773", "#D9833B", "#9DC964", "#1962A5"];

    public render() {
        let data: any[] = [];
        const accounts: any[] = [];
        _.forEach(this.props.data, (values, date)  => {
            const res = {date};
            _.forEach(values, v => {
                res[v[0]] = int2Money(v[1]);
                if (!_.includes(accounts, v[0])) {
                    accounts.push(v[0]);
                }
            });
            data.push(res);
        });
        data = _.sortBy(data, "date");

        // Loop over all results and fill in missing accounts each month
        for (let i = 0; i < data.length; i++) {
            _.forEach(accounts, a => {
                if (_.isNil(data[i][a])) {
                    data[i][a] = _.has(data, i-1) ? data[i-1][a] : 0;
                }
            });
        }

        return (
            <div>
                <h2 className="title is-3">Balance</h2>
                <AreaChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<ChartTooltip showTotal={true} />}/>
                    <Legend verticalAlign="bottom" height={36} />
                    {_.map(accounts, (acc, i) =>
                        <Area
                            key={i}
                            name={acc}
                            type="monotone"
                            dataKey={acc}
                            stroke={this.chartColors[i]}
                            fill={this.chartColors[i]}
                            stackId="1"
                            unit="€"
                        />
                    )}
                </AreaChart>
            </div>
        );
    }
}
