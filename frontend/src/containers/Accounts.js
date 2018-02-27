import React from 'react';
import { connect } from 'react-redux';

import {clickAccount} from '../actions';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        clickedAccount: state.clickedAccount,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClickAccount: id => {
            dispatch(clickAccount(id))
        }
    }
};

class Accounts extends React.Component {
    render() {
        console.log(this.props.clickedAccount);
        return (
            <div className="container">
                <h1>Accounts</h1>
                <a onClick={this.props.onClickAccount.bind(this, this.props.clickedAccount+1)}>Click</a>
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accounts);
