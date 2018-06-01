import {IAccount} from '../types';
import {deleteResource, errorOnFetch, fetchResource, saveResource} from './fetch';
import {loadedMovements} from './movements';

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const TOGGLE_ACCOUNTS_MODAL = "TOGGLE_ACCOUNTS_MODAL";

export const loadAccounts = () => ((dispatch: any) => {
    dispatch(loadedMovements([]));
    fetchResource('accounts').then(
        (response: any) => dispatch(loadedAccounts(response.data)),
        (error: any) => dispatch(errorOnFetch(error))
    )
});

const loadedAccounts = (accounts: IAccount[]) => ({
    accounts,
    type: LOADED_ACCOUNT,
});

export const selectAccount = (accountId: string) => ({
    account_id: accountId,
    type: SELECT_ACCOUNT,
});

export const toggleShowAccountsModal = () => ({
    type: TOGGLE_ACCOUNTS_MODAL,
});

export const saveAccount = (account: IAccount) => {
    return (dispatch: any) => {
        return saveResource(`accounts`, account).then(
            (response: any) => {
                dispatch(loadAccounts());
                return dispatch(toggleShowAccountsModal());
            },
            (error: any) => dispatch(errorOnFetch(error))
        );
    };
};

export const deleteAccount = (accountId: string) => {
    return (dispatch: any) => {
        return deleteResource(`accounts/${accountId}`).then(
            (response: any) => dispatch(loadAccounts()),
            (error: any) => dispatch(errorOnFetch(error))
        );
    };
};
