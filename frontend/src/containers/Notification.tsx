import * as React from 'react';
import { connect } from 'react-redux';

import {removeNotification} from '../actions';

const mapStateToProps = (state: any) => ({
    notification: state.notification,
    notificationState: state.notificationState,
});

const mapDispatchToProps = (dispatch: any) => ({
    onRemoveNotification: () => dispatch(removeNotification()),
})

class Notification extends React.Component<any, any> {
    public render() {
        const extra = this.props.notification !== '' ? '' : 'inactive';
        return (
            <div className={`notification is-${this.props.notificationState} main-notification ${extra}`}>
                <button className="delete" onClick={this.props.onRemoveNotification} />
                {this.props.notification}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
