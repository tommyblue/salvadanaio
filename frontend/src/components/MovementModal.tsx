import * as _ from 'lodash';
import * as React from 'react';

import MovementForm from './MovementForm';

interface IState {
    account_id: string;
    amount: string;
    category_id: string;
    description: string;
    operation_date: string;
    short_description: string;
    value_date: string;
}

export default class extends React.Component<any, IState> {
    constructor(props: IState) {
        super(props);
        this.state = this.getInitialState(props);
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
                        <span>New movement</span>
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
                        <p className="modal-card-title">New movement</p>
                        <button className="delete" aria-label="close" onClick={this.props.toggleShowModal} />
                    </header>
                    <section className="modal-card-body">
                        <MovementForm
                            accounts={this.props.accounts}
                            categories={this.props.categories}
                            movement={this.state}
                            onSetValue={this.setValue}
                        />
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-primary"
                            onClick={this.submitForm}
                        >Save movement</button>
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
        this.props.onSaveMovement(this.state).then(() => this.setState({...this.getInitialState(this.props)}));
    }

    private getInitialState(props: any) {
        return {
            "account_id": props.accounts && props.accounts.length > 0 ? props.accounts[0].id : "",
            "amount": "",
            "category_id": "",
            "description": "",
            "operation_date": "",
            "short_description": "",
            "value_date": "",
        };
    }
}
