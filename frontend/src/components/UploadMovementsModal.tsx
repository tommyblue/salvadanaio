import * as React from 'react';

import AccountSelector from './AccountSelector';

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.selectAccount = this.selectAccount.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.close = this.close.bind(this);
        this.state = this.getInitialState();
    }

    public getInitialState() {
        return {selectedFile: null, selectedAccount: ''};
    }

    public render() {
        return (
            <div>
                <div className="has-text-right">
                    <a className="button is-primary" onClick={this.close}>
                        <span className="icon">
                            <i className="fas fa-upload" />
                        </span>
                        <span>Upload movements</span>
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
                        <p className="modal-card-title">Upload movements file</p>
                        <button className="delete" aria-label="close" onClick={this.props.toggleShowModal} />
                    </header>
                    <section className="modal-card-body">
                        <form>
                            <div className="field">
                                <label className="label">Account</label>
                                <div className="control">
                                    <AccountSelector
                                        accounts={this.props.accounts}
                                        selectedAccount={this.state.selectedAccount}
                                        onSelectAccount={this.selectAccount}
                                        includeEmpty={true}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">File</label>
                                <div className="control">
                                    <input type="file" onChange={this.selectFile} />
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-primary"
                            onClick={this.submitForm}
                            disabled={this.isButtonDisabled()}
                        >Upload!</button>
                    </footer>
                </div>
            </div>
        );
    }

    private isButtonDisabled() {
        return this.state.selectedAccount === '' || this.state.selectedFile === null;
    }

    private selectAccount(accountId: any) {
        if (accountId !== this.state.selectedAccount) {
            this.setState({...this.state, selectedAccount: accountId});
        }
    }

    private selectFile(e: any) {
        this.setState({...this.state, selectedFile: e.target.files[0]});
    }

    private submitForm() {
        if (this.state.selectedFile !== null && this.state.selectedAccount !== '') {
            this.props.onUpload(this.state.selectedAccount, this.state.selectedFile);
            this.setState(this.getInitialState());
            this.close();
        }
    }

    private close() {
        this.setState(this.getInitialState());
        this.props.toggleShowModal();
    }
}
