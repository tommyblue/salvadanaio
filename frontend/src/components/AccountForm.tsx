import * as _ from 'lodash';
import * as React from 'react';

import CalendarField from './CalendarField';

export default class extends React.Component<any, any> {
    public render() {
        return (
            <form>
                {this.showField("name", "text")}
                {this.showField("balance", "number")}
                <div className="field">
                    <label className="label">Balance update date</label>
                    <div className="control">
                        <CalendarField
                            elementId="balanceUpdateDateCalendar"
                            onSetDate={(value: any) => this.setValue("balance_update_date", value, "text")}
                        />
                    </div>
                </div>
            </form>
        );
    }

    private showField(fieldName: string, fieldType: string) {
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

    private setValue(fieldName: string, value: string, fieldType: string) {
        let formattedValue;
        if (fieldType === "number" && !_.isEmpty(value)) {
            formattedValue = parseFloat(parseFloat(value).toFixed(2));
        } else {
            formattedValue = value;
        }
        this.props.onSetValue(fieldName, formattedValue);
    }
}
