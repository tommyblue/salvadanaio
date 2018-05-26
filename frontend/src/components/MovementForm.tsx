import * as _ from 'lodash';
import * as React from 'react';

import AccountSelector from './AccountSelector';
import CalendarField from './CalendarField';
import CategorySelector from './CategorySelector';

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.selectAccount = this.selectAccount.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }

    public render() {
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
                            onSetDate={(value: string) => this.setValue("operation_date", value, "text")}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Value date</label>
                    <div className="control">
                        <CalendarField
                            elementId="valueDateCalendar"
                            onSetDate={(value: string) => this.setValue("value_date", value, "text")}
                        />
                    </div>
                </div>
                {this.showField("short_description", "text")}
                {this.showField("description", "text")}

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
                        value={this.props.movement[fieldName]}
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

    private selectAccount(accountId: any) {
        if (accountId !== this.props.movement.account_id) {
            this.props.onSetValue("account_id", accountId);
        }
    }

    private selectCategory(categoryId: any) {
        if (categoryId !== this.props.movement.category_id) {
            this.props.onSetValue("category_id", categoryId);
        }
    }
}
