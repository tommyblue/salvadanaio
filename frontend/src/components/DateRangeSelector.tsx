import * as _ from 'lodash';
import * as React from 'react';

const availableDateRanges = [{
    title: "Last 30 days",
    value: 30,
}, {
    title: "Last 90 days",
    value: 90,
}, {
    title: "Last 120 days",
    value: 120,
}];

export default (props: any) => (
    <div className="select">
        <select value={props.selectedDateRange} onChange={(e) => (props.onSelectDateRange(e.target.value))}>
            {_.map(availableDateRanges, (d) => (
                <option key={d.value} value={d.value}>{d.title}</option>
            ))}
        </select>
    </div>
);
