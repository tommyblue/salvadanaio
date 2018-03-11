import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    loadMovements,
    loadAccounts,
    saveMovement,
    selectAccount,
    selectCategory,
    selectDateRange,
} from '../actions';
import AccountSelector from '../components/AccountSelector';
import DateRangeSelector from '../components/DateRangeSelector';
import CategorySelector from '../components/CategorySelector';
import MovementsTable from '../components/MovementsTable';
import MovementModal from '../components/MovementModal';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        movements: state.movements,
        selectedAccount: state.selectedAccount,
        selectedCategory: state.selectedCategory,
        selectedDateRange: state.selectedDateRange,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMovements: (account_id) => dispatch(loadMovements(account_id)),
        onLoadAccounts: () => dispatch(loadAccounts()),
        onSelectAccount: (account_id) => dispatch(selectAccount(account_id)),
        onSelectCategory: (category_id) => dispatch(selectCategory(category_id)),
        onSelectDateRange: (dateRange) => dispatch(selectDateRange(dateRange)),
        onSaveMovement: (movement) => dispatch(saveMovement(movement)),
    }
};
class Movements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {availableCategories: []};
        this.selectAccount = this.selectAccount.bind(this);
    }

    componentDidMount() {
        this.props.onLoadAccounts();
        if (this.props.selectedAccount) {
            this.props.onLoadMovements({
                accountId: this.props.selectedAccount,
                dateRange: this.props.selectedDateRange,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedAccount !== nextProps.selectedAccount
            || this.props.selectedDateRange !== nextProps.selectedDateRange
        ) {
            this.props.onLoadMovements({
                accountId: nextProps.selectedAccount,
                dateRange: nextProps.selectedDateRange
            });
        }

        const categories = [];
        const categories_ids = [];
        _.forEach(nextProps.movements, (m) => {
            if (m.category && !_.includes(categories_ids, m.category.identifier)) {
                categories.push(m.category);
                categories_ids.push(m.category.identifier);
            }
        });
        this.setState({...this.state, availableCategories: _.sortBy(categories, "title")});
    }

    componentWillUnmount() {
        this.props.onSelectCategory("");
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Movements</h1>
                <div className="columns">
                    <div className="column movement-filters">
                        <AccountSelector
                            accounts={this.props.accounts}
                            selectedAccount={this.props.selectedAccount}
                            onSelectAccount={this.selectAccount}
                        />
                        <DateRangeSelector
                            selectedDateRange={this.props.selectedDateRange}
                            onSelectDateRange={this.props.onSelectDateRange}
                        />
                        <CategorySelector
                            categories={this.state.availableCategories}
                            selectedCategory={this.props.selectedCategory}
                            onSelectCategory={this.props.onSelectCategory}
                        />
                    </div>
                    <div className="column is-2 is-offset-4">
                        <MovementModal
                            accounts={this.props.accounts}
                            onSaveMovement={this.props.onSaveMovement}
                        />
                    </div>
                </div>
                <MovementsTable movements={this.getFilteredMovements()}/>
            </div>
        );
    }

    selectAccount(account_id) {
        if (account_id !== this.props.selectedAccount) {
            this.props.onSelectAccount(account_id);
            this.props.onSelectCategory("");
        }
    }

    getFilteredMovements() {
        if (_.isNil(this.props.selectedCategory) || _.isEmpty(this.props.selectedCategory)) {
            return this.props.movements;
        }
        return _.filter(this.props.movements, (m) => (m.category && m.category.identifier === this.props.selectedCategory));
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movements);
