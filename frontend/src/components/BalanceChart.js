import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

import {int2Money} from '../utils';

export default class extends React.Component {
    render() {
        const data = _.map(this.props.data, d => ({pv: int2Money(d[0]), name: d[1]}));
        return (
            <LineChart width={730} height={250} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line name="pv of pages" type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
        );
    }
}
