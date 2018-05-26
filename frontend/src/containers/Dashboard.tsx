import * as React from 'react';
import { connect } from 'react-redux';

import {
    loadAnalyticsBalance,
    loadAnalyticsMovements,
    selectDateRange,
} from '../actions';
import BalanceChart from '../components/BalanceChart';
import DateRangeSelector from '../components/DateRangeSelector';
import MovementsChart from '../components/MovementsChart';

const mapStateToProps = (state: any) => {
    return {
        balance: state.analytics.balance,
        movements: state.analytics.movements,
        selectedDateRange: state.selectedDateRange,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoadBalance: () => dispatch(loadAnalyticsBalance()),
        onLoadMovements: () => dispatch(loadAnalyticsMovements()),
        onSelectDateRange: (dateRange: any) => dispatch(selectDateRange(dateRange)),

    }
};

class Dashboard extends React.Component<any, any> {
    public componentDidMount() {
        this.props.onLoadBalance();
        this.props.onLoadMovements();
    }

    public render() {
        return (
            <div className="container dashboard">
                <h1 className="title">Dashboard</h1>
                <DateRangeSelector
                    selectedDateRange={this.props.selectedDateRange}
                    onSelectDateRange={this.props.onSelectDateRange}
                />
                <section><BalanceChart data={this.props.balance}/></section>
                <section><MovementsChart data={this.props.movements}/></section>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
