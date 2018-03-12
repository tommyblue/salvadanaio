import React from 'react';
import _ from 'lodash';

export default (props) => (
    <div className="select">
        <select value={props.selectedCategory} onChange={(e) => (props.onSelectCategory(e.target.value))}>
            <option value="">Select category</option>
            {_.map(props.categories, (d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
            ))}
        </select>
    </div>
);
