import { ThunkAction } from "redux-thunk";

export type ApiThunkAction = ThunkAction<Promise<any>, IGlobalState, void>;

export interface IAccount {
    id: number;
    name: string;
}

export interface ICategory {
    id: number;
}

export interface IMovement {
    category_id: string;
}

export interface IGlobalState {
    accounts: IAccount[];
    categories: ICategory[];
    isAuthenticated: boolean;
    movements: IMovement[];
    selectedAccount: string;
    selectedCategory: string;
    selectedDateRange: string;
    showAccountsModal: boolean;
    showMovementsModal: boolean;
    showUploadMovementsModal: boolean;
}
