import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

import { int2Money } from '../utils';

export default class extends React.Component {
    render() {
        const data = _.map(this.props.data, d => ({ pv: int2Money(d[0]), name: d[1] }));
        return (
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
        );
    }
}
