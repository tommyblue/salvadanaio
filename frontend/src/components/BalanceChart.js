import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

import {int2Money} from '../utils';

export default class extends React.Component {
    chartColors = ["#18fcd5", "#c75652", "#d945f0"];

    render() {
        const data = [];
        const accounts = [];
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

        return (
            <div>
                <h2 className="title is-3">Balance</h2>
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    {_.map(accounts, (acc, i) =>
                        <Line
                            key={i}
                            name={acc}
                            type="linear"
                            dataKey={acc}
                            stroke={this.chartColors[i]}
                        />
                    )}
                </LineChart>
            </div>
        );
    }
}
