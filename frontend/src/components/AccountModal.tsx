import * as _ from 'lodash';
import * as React from 'react';

import AccountForm from './AccountForm';

interface IProps {
    onSaveAccount: (state: IState) => any;
    showModal: boolean;
    toggleShowModal: (e: any) => any;
}

interface IState {
    balance: string;
    balance_update_date: string;
    name: string;
}

export default class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = this.getInitialState();
        this.setValue = this.setValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    public render() {
        return (
            <div>
                <div className="has-text-right">
                    <a className="button is-primary" onClick={this.props.toggleShowModal}>
                        <span className="icon">
                            <i className="fas fa-plus" />
                        </span>
                        <span>New account</span>
                    </a>
                </div>
                {this.modal()}
            </div>
        );
    }

    private modal() {
        return (
            <div className={`modal ${this.props.showModal && "is-active"}`}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New account</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={this.props.toggleShowModal} />
                    </header>
                    <section className="modal-card-body">
                        <AccountForm
                            account={this.state}
                            onSetValue={this.setValue}
                        />
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-primary"
                            onClick={this.submitForm}
                        >Save account</button>
                    </footer>
                </div>
            </div>
        );
    }

    private setValue(field: string, value: string) {
        const newState: IState = _.cloneDeep(this.state);
        newState[field] = value;
        this.setState(newState);
    }

    private submitForm() {
        this.props.onSaveAccount(this.state).then(() => this.setState({...this.getInitialState()}));
    }

    private getInitialState() {
        return {
            "balance": "",
            "balance_update_date": "",
            "name": "",
        };
    }
}
