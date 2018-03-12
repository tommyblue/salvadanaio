import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    deleteMovement,
    loadAccounts,
    loadCategories,
    loadMovements,
    saveMovement,
    selectAccount,
    selectCategory,
    selectDateRange,
    toggleShowMovementsModal,
} from '../actions';
import AccountSelector from '../components/AccountSelector';
import DateRangeSelector from '../components/DateRangeSelector';
import CategorySelector from '../components/CategorySelector';
import MovementsTable from '../components/MovementsTable';
import MovementModal from '../components/MovementModal';

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        categories: state.categories,
        movements: state.movements,
        selectedAccount: state.selectedAccount,
        selectedCategory: state.selectedCategory,
        selectedDateRange: state.selectedDateRange,
        showMovementsModal: state.showMovementsModal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadMovements: (params) => dispatch(loadMovements(params)),
        onLoadAccounts: () => dispatch(loadAccounts()),
        onLoadCategories: () => dispatch(loadCategories()),
        onSelectAccount: (account_id) => dispatch(selectAccount(account_id)),
        onSelectCategory: (category_id) => dispatch(selectCategory(category_id)),
        onSelectDateRange: (dateRange) => dispatch(selectDateRange(dateRange)),
        onSaveMovement: (movement) => dispatch(saveMovement(movement)),
        toggleShowMovementsModal: () => dispatch(toggleShowMovementsModal()),
        onDeleteMovement: (movement_id) => dispatch(deleteMovement(movement_id)),
    }
};
class Movements extends React.Component {
    constructor(props) {
        super(props);
        this.selectAccount = this.selectAccount.bind(this);
    }

    componentDidMount() {
        this.props.onLoadAccounts();
        this.props.onLoadCategories();
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
                            categories={this.props.categories}
                            selectedCategory={this.props.selectedCategory}
                            onSelectCategory={this.props.onSelectCategory}
                        />
                    </div>
                    <div className="column is-2 is-offset-4">
                        <MovementModal
                            showModal={this.props.showMovementsModal}
                            toggleShowModal={this.props.toggleShowMovementsModal}
                            accounts={this.props.accounts}
                            categories={this.props.categories}
                            onSaveMovement={this.props.onSaveMovement}
                        />
                    </div>
                </div>
                <MovementsTable
                    movements={this.getFilteredMovements()}
                    onDeleteMovement={this.props.onDeleteMovement}
                />
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
        if (!_.isNumber(this.props.selectedCategory)) {
            return this.props.movements;
        }
        return _.filter(this.props.movements, (m) => (m.category_id === this.props.selectedCategory));
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movements);
