import React from 'react';
import _ from 'lodash';

import AccountSelector from './AccountSelector';
import CategorySelector from './CategorySelector';
import CalendarField from './CalendarField';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.selectAccount = this.selectAccount.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    render() {
        return (
            <form>
                <div className="field">
                    <label className="label">Account</label>
                    <div className="control">
                        <AccountSelector
                            accounts={this.props.accounts}
                            selectedAccount={this.props.movement.account_id}
                            onSelectAccount={this.selectAccount}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        <CategorySelector
                            categories={this.props.categories}
                            selectedCategory={this.props.movement.category_id}
                            onSelectCategory={this.selectCategory}
                        />
                    </div>
                </div>

                {this.showField("amount", "number")}
                <div className="field">
                    <label className="label">Operation date</label>
                    <div className="control">
                        <CalendarField
                            elementId="operationDateCalendar"
                            onSetDate={(value) => this.setValue("operation_date", value, "text")}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Value date</label>
                    <div className="control">
                        <CalendarField
                            elementId="valueDateCalendar"
                            onSetDate={(value) => this.setValue("value_date", value, "text")}
                        />
                    </div>
                </div>
                {this.showField("short_description", "text")}
                {this.showField("description", "text")}

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
                        value={this.props.movement[fieldName]}
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

    selectAccount(account_id) {
        if (account_id !== this.props.movement.account_id) {
            this.props.onSetValue("account_id", account_id);
        }
    }

    selectCategory(category_id) {
        if (category_id !== this.props.movement.category_id) {
            this.props.onSetValue("category_id", category_id);
        }
    }
}
