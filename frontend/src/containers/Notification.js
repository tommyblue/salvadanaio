import React from 'react';
import { connect } from 'react-redux';

import {removeNotification} from '../actions';

const mapStateToProps = state => ({
    notification: state.notification,
    notificationState: state.notificationState,
});

const mapDispatchToProps = dispatch => ({
    onRemoveNotification: () => dispatch(removeNotification()),
})

class Notification extends React.Component {
    render() {
        const extra = this.props.notification !== '' ? '' : 'inactive';
        return (
            <div className={`notification is-${this.props.notificationState} main-notification ${extra}`}>
                <button className="delete" onClick={this.props.onRemoveNotification}></button>
                {this.props.notification}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
