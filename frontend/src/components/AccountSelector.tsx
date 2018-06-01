import * as _ from 'lodash';
import * as React from 'react';

import {IAccount} from '../types';

interface IProps {
    includeEmpty?: boolean;
    accounts: IAccount[];
    selectedAccount: string;
    onSelectAccount: (target: string | number) => void;
}

export default class extends React.Component<IProps, {}> {
    public componentWillReceiveProps(nextProps: IProps) {
        if (!this.props.includeEmpty && _.isEmpty(nextProps.selectedAccount) && nextProps.accounts.length > 0) {
            nextProps.onSelectAccount(nextProps.accounts[0].id);
        }
    }

    public render() {
        const { accounts, selectedAccount, onSelectAccount } = this.props;
        return (
            <div className="select">
                <select
                    value={selectedAccount}
                    onChange={
                        (e: React.ChangeEvent<HTMLSelectElement>) =>
                            (onSelectAccount(e.target.value)
                        )
                    }
                >
                    {this.includeEmpty()}
                    {_.map(accounts, (a: IAccount) => (
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
