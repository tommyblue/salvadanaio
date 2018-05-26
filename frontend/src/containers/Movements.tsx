import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

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
    toggleShowUploadMovementsModal,
    uploadMovements,
} from '../actions';
import AccountSelector from '../components/AccountSelector';
import CategorySelector from '../components/CategorySelector';
import DateRangeSelector from '../components/DateRangeSelector';
import MovementModal from '../components/MovementModal';
import MovementsTable from '../components/MovementsTable';
import UploadMovementsModal from '../components/UploadMovementsModal';

const mapStateToProps = (state: any) => {
    return {
        accounts: state.accounts,
        categories: state.categories,
        movements: state.movements,
        selectedAccount: state.selectedAccount,
        selectedCategory: state.selectedCategory,
        selectedDateRange: state.selectedDateRange,
        showMovementsModal: state.showMovementsModal,
        showUploadMovementsModal: state.showUploadMovementsModal,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDeleteMovement: (movementId: string) => dispatch(deleteMovement(movementId)),
        onLoadAccounts: () => dispatch(loadAccounts()),
        onLoadCategories: () => dispatch(loadCategories()),
        onLoadMovements: (params: any) => dispatch(loadMovements(params)),
        onSaveMovement: (movement: any) => dispatch(saveMovement(movement)),
        onSelectAccount: (accountId: string) => dispatch(selectAccount(accountId)),
        onSelectCategory: (categoryId: string) => dispatch(selectCategory(categoryId)),
        onSelectDateRange: (dateRange: any) => dispatch(selectDateRange(dateRange)),
        onUploadMovements: (accountId: string, file: any) => dispatch(uploadMovements(accountId, file)),
        toggleShowMovementsModal: () => dispatch(toggleShowMovementsModal()),
        toggleShowUploadMovementsModal: () => dispatch(toggleShowUploadMovementsModal()),
    }
};
class Movements extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.selectAccount = this.selectAccount.bind(this);
    }

    public componentDidMount() {
        this.props.onLoadAccounts();
        this.props.onLoadCategories();
        if (this.props.selectedAccount) {
            this.props.onLoadMovements({
                accountId: this.props.selectedAccount,
                dateRange: this.props.selectedDateRange,
            });
        }
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.props.selectedAccount !== nextProps.selectedAccount
            || this.props.selectedDateRange !== nextProps.selectedDateRange
        ) {
            this.props.onLoadMovements({
                accountId: nextProps.selectedAccount,
                dateRange: nextProps.selectedDateRange
            });
        }
    }

    public componentWillUnmount() {
        this.props.onSelectCategory("");
    }

    public render() {
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
                    <div className="column movement-modals-buttons">
                        <MovementModal
                            showModal={this.props.showMovementsModal}
                            toggleShowModal={this.props.toggleShowMovementsModal}
                            accounts={this.props.accounts}
                            categories={this.props.categories}
                            onSaveMovement={this.props.onSaveMovement}
                        />
                        <UploadMovementsModal
                            showModal={this.props.showUploadMovementsModal}
                            toggleShowModal={this.props.toggleShowUploadMovementsModal}
                            accounts={this.props.accounts}
                            onUpload={this.props.onUploadMovements}
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

    private selectAccount(accountId: string) {
        if (accountId !== this.props.selectedAccount) {
            this.props.onSelectAccount(accountId);
            this.props.onSelectCategory("");
        }
    }

    private getFilteredMovements() {
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
