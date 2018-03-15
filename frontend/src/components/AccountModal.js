import React from 'react';
import _ from 'lodash';

import AccountForm from './AccountForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);
        this.setValue = this.setValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (
            <div>
                <div className="has-text-right">
                    <a className="button is-primary" onClick={this.props.toggleShowModal}>
                        <span className="icon">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span>New account</span>
                    </a>
                </div>
                {this.modal()}
            </div>
        );
    }

    modal() {
        return (
            <div className={`modal ${this.props.showModal && "is-active"}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New account</p>
                        <button className="delete" aria-label="close" onClick={this.props.toggleShowModal}></button>
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

    setValue(field, value) {
        const newState = _.cloneDeep(this.state);
        newState[field] = value;
        this.setState(newState);
    }

    submitForm() {
        this.props.onSaveAccount(this.state).then(() => this.setState({...this.getInitialState(this.props)}));
    }

    getInitialState(props) {
        return {
            "name": "",
            "balance": "",
            "balance_update_date": "",
        };
    }
}
