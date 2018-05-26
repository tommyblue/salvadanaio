import * as _ from 'lodash';
import * as React from 'react';

export default class extends React.Component<any, any> {
    public componentWillReceiveProps(nextProps: any) {
        if (!this.props.includeEmpty && _.isEmpty(nextProps.selectedAccount) && nextProps.accounts.length > 0) {
            nextProps.onSelectAccount(nextProps.accounts[0].id);
        }
    }

    public render() {
        const { accounts, selectedAccount, onSelectAccount } = this.props;
        return (
            <div className="select">
                <select value={selectedAccount} onChange={(e) => (onSelectAccount(e.target.value))}>
                    {this.includeEmpty()}
                    {_.map(accounts, (a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>
            </div>
        );
    }

    private includeEmpty(): JSX.Element | null {
        if (this.props.includeEmpty) {
            return <option key="null" value="">Select an option..</option>
        }
        return null;
    }
}
