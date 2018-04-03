import React from 'react';
import { connect } from 'react-redux';

import {
    loadAnalyticsBalance,
    loadAnalyticsMovements,
    selectDateRange,
} from '../actions';
import DateRangeSelector from '../components/DateRangeSelector';
import BalanceChart from '../components/BalanceChart';
import MovementsChart from '../components/MovementsChart';

const mapStateToProps = state => {
    return {
        selectedDateRange: state.selectedDateRange,
        balance: state.analytics.balance,
        movements: state.analytics.movements,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectDateRange: (dateRange) => dispatch(selectDateRange(dateRange)),
        onLoadBalance: () => dispatch(loadAnalyticsBalance()),
        onLoadMovements: () => dispatch(loadAnalyticsMovements()),

    }
};

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.onLoadBalance();
        this.props.onLoadMovements();
    }

    render() {
        return (
            <div className="container dashboard">
                <h1 className="title">Dashboard</h1>
                <DateRangeSelector
                    selectedDateRange={this.props.selectedDateRange}
                    onSelectDateRange={this.props.onSelectDateRange}
                />
                <section><MovementsChart data={this.props.movements}/></section>
                <section><BalanceChart data={this.props.balance}/></section>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
