import {deleteResource, errorOnFetch, fetchResource, saveResource} from './fetch';
import {emptyMovements} from './movements';

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const TOGGLE_ACCOUNTS_MODAL = "TOGGLE_ACCOUNTS_MODAL";

export const loadAccounts = () => ((dispatch: any) => {
    dispatch(emptyMovements());
    fetchResource('accounts').then(
        (response: any) => dispatch(loadedAccounts(response.data)),
        (error: any) => dispatch(errorOnFetch(error))
    )
});

const loadedAccounts = (accounts: any) => ({
    accounts,
    type: LOADED_ACCOUNT,
});

export const selectAccount = (accountId: any) => ({
    account_id: accountId,
    type: SELECT_ACCOUNT,
});

export const toggleShowAccountsModal = () => ({
    type: TOGGLE_ACCOUNTS_MODAL,
});

export const saveAccount = (account: any) => {
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

export const deleteAccount = (accountId: any) => {
    return (dispatch: any) => {
        return deleteResource(`accounts/${accountId}`).then(
            (response: any) => dispatch(loadAccounts()),
            (error: any) => dispatch(errorOnFetch(error))
        );
    };
};
