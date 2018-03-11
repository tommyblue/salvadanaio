import React from 'react';
import _ from 'lodash';

import MovementForm from './MovementForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, movement: {
            "account_id": props.accounts.length > 0 ? props.accounts[0].id : "",
            "amount": "",
            "operation_date": "",
            "value_date": "",
            "short_description": "",
            "description": "",
        }};
        this.toggleModal = this.toggleModal.bind(this);
        this.setValue = this.setValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    render() {
        return (
            <div>
                <div className="has-text-right">
                    <a className="button is-primary" onClick={this.toggleModal}>
                        <span className="icon">
                            <i className="fas fa-plus"></i>
                        </span>
                        <span>New movement</span>
                    </a>
                </div>
                {this.modal()}
            </div>
        );
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    modal() {
        return (
            <div className={`modal ${this.state.showModal && "is-active"}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New movement</p>
                        <button className="delete" aria-label="close" onClick={this.toggleModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <MovementForm
                            accounts={this.props.accounts}
                            movement={this.state.movement}
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

    setValue(field, value) {
        const newState = _.cloneDeep(this.state);
        newState.movement[field] = value;
        this.setState(newState);
    }

    submitForm() {
        this.props.onSaveMovement(this.state.movement);
    }
}
