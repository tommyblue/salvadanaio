import React from 'react';
import _ from 'lodash';

const availableDateRanges = [{
    value: 30,
    title: "Last 30 days",
}, {
    value: 90,
    title: "Last 90 days",
}, {
    value: 120,
    title: "Last 120 days",
}];

export default (props) => (
    <div className="select is-right">
        <select value={props.selectedDateRange} onChange={(e) => (props.onSelectDateRange(e.target.value))}>
            {_.map(availableDateRanges, (d) => (
                <option key={d.value} value={d.value}>{d.title}</option>
            ))}
        </select>
    </div>
);
