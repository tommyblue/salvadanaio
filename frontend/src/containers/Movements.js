import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {loadMovements} from '../actions';
import {formatMoney, formatISODate} from '../utils';
import LoadingSpinner from '../components/LoadingSpinner';

const mapStateToProps = state => {
    return {
        movements: state.movements,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMovements: () => {
            dispatch(loadMovements())
        }
    }
};
class Movements extends React.Component {
    componentDidMount() {
        this.props.loadMovements();
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Movements</h1>
                {this.movementsTable()}
            </div>
        );
    }

    movementsTable() {
        if (_.isEmpty(this.props.movements)) {
            return (<LoadingSpinner />);
        }
        return (
            <table className="table is-bordered is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Operation date</th>
                        <th>Value date</th>
                    </tr>
                </thead>
                <tbody>
                {_.map(this.props.movements, (m) => (
                    <tr key={`account_${m.id}`}>
                        <td>{m.short_description}</td>
                        <td>{formatMoney(m.amount)}</td>
                        <td>{formatISODate(m.operation_date)}</td>
                        <td>{formatISODate(m.value_date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movements);
