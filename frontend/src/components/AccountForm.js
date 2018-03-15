import React from 'react';
import _ from 'lodash';

import CalendarField from './CalendarField';

export default class extends React.Component {
    render() {
        return (
            <form>
                {this.showField("name", "text")}
                {this.showField("balance", "number")}
                <div className="field">
                    <label className="label">Balance update date</label>
                    <div className="control">
                        <CalendarField
                            elementId="balanceUpdateDateCalendar"
                            onSetDate={(value) => this.setValue("balance_update_date", value, "text")}
                        />
                    </div>
                </div>
            </form>
        );
    }

    showField(fieldName, fieldType) {
        const title = _.capitalize(_.replace(fieldName, "_", " "));
        return (
            <div className="field">
                <label className="label">{title}</label>
                <div className="control">
                    <input
                        className="input"
                        type={fieldType}
                        placeholder={title}
                        value={this.props.account[fieldName]}
                        onChange={(e) => this.setValue(fieldName, e.target.value, fieldType)}
                    />
                </div>
            </div>
        );
    }

    setValue(fieldName, value, fieldType) {
        let formattedValue = value;
        if (fieldType === "number" && !_.isEmpty(value)) {
            formattedValue = parseFloat(parseFloat(value).toFixed(2));
        }
        this.props.onSetValue(fieldName, formattedValue);
    }
}
