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
    toggleMovementsModal,
    toggleUploadMovementsModal,
    uploadMovements,
} from '../actions';
import AccountSelector from '../components/AccountSelector';
import CategorySelector from '../components/CategorySelector';
import DateRangeSelector from '../components/DateRangeSelector';
import MovementModal from '../components/MovementModal';
import MovementsTable from '../components/MovementsTable';
import UploadMovementsModal from '../components/UploadMovementsModal';
import {IAccount, ICategory, IGlobalState, IMovement} from '../types';

interface IProps {
    accounts: IAccount[];
    categories: ICategory[];
    movements: IMovement[];
    selectedAccount: string;
    selectedCategory: string;
    selectedDateRange: string,
    showMovementsModal: boolean;
    showUploadMovementsModal: boolean;
    onDeleteMovement: (movementId: string) => void;
    onLoadAccounts: () => void;
    onLoadCategories: () => void;
    onLoadMovements: (accountId: string, dateRange: string) => void;
    onSaveMovement: (movement: IMovement) => void;
    onSelectAccount: (accountId: string) => void;
    onSelectCategory: (categoryId: string) => void;
    onSelectDateRange: (dateRange: string) => void;
    onUploadMovements: (accountId: string, file: any) => void;
    toggleShowMovementsModal: () => void;
    toggleShowUploadMovementsModal: () => void;
}

const mapStateToProps = (state: IGlobalState) => {
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
        onLoadMovements: (accountId: string, dateRange: string) =>
                         dispatch(loadMovements(accountId, dateRange)),
        onSaveMovement: (movement: IMovement) => dispatch(saveMovement(movement)),
        onSelectAccount: (accountId: string) => dispatch(selectAccount(accountId)),
        onSelectCategory: (categoryId: string) => dispatch(selectCategory(categoryId)),
        onSelectDateRange: (dateRange: string) => dispatch(selectDateRange(dateRange)),
        onUploadMovements: (accountId: string, file: any) =>
                           dispatch(uploadMovements(accountId, file)),
        toggleShowMovementsModal: () => dispatch(toggleMovementsModal()),
        toggleShowUploadMovementsModal: () => dispatch(toggleUploadMovementsModal()),
    }
};
class Movements extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.selectAccount = this.selectAccount.bind(this);
    }

    public componentDidMount() {
        this.props.onLoadAccounts();
        this.props.onLoadCategories();
        if (this.props.selectedAccount) {
            this.props.onLoadMovements(
                this.props.selectedAccount,
                this.props.selectedDateRange,
            );
        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        if (this.props.selectedAccount !== nextProps.selectedAccount
            || this.props.selectedDateRange !== nextProps.selectedDateRange
        ) {
            this.props.onLoadMovements(
                nextProps.selectedAccount,
                nextProps.selectedDateRange
            );
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

    private getFilteredMovements(): IMovement[] {
        if (!_.isNumber(this.props.selectedCategory)) {
            return this.props.movements;
        }
        return _.filter(
            this.props.movements, (m: IMovement) => (m.category_id === this.props.selectedCategory)
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Movements);
