import * as _ from 'lodash';
import * as React from 'react';

export default (props: any) => (
    <div className="select">
        <select value={props.selectedCategory} onChange={(e) => (props.onSelectCategory(e.target.value))}>
            <option value="">Select category</option>
            {_.map(props.categories, (d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
            ))}
        </select>
    </div>
);
