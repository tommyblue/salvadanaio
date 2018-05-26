import * as _ from 'lodash';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { int2Money } from '../utils';
import ChartTooltip from './ChartTooltip';

export default class extends React.Component<any, any> {
    public render() {
        const data = _.map(this.props.data, d => ({ amount: int2Money(d[0]), name: d[1] }));
        return (
            <div>
                <h2 className="title is-3">Movements</h2>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltip showTotal={false} />}/>
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
}
