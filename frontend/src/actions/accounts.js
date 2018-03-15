import {fetchResource, errorOnFetch, saveResource, deleteResource} from './fetch';
import {emptyMovements} from './movements';

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";
export const TOGGLE_ACCOUNTS_MODAL = "TOGGLE_ACCOUNTS_MODAL";

export const loadAccounts = () => ((dispatch) => {
    dispatch(emptyMovements());
    fetchResource('accounts').then(
        response => dispatch(loadedAccounts(response.data)),
        error => dispatch(errorOnFetch(error))
    )
});

const loadedAccounts = (accounts) => ({
    type: LOADED_ACCOUNT,
    accounts,
});

export const selectAccount = (account_id) => ({
    type: SELECT_ACCOUNT,
    account_id,
});

export const toggleShowAccountsModal = () => ({
    type: TOGGLE_ACCOUNTS_MODAL,
});

export const saveAccount = (account) => {
    return function (dispatch, getState) {
        return saveResource(`accounts`, account).then(
            response => {
                dispatch(loadAccounts());
                return dispatch(toggleShowAccountsModal());
            },
            error => dispatch(errorOnFetch(error))
        );
    };
};

export const deleteAccount = (account_id) => {
    return function (dispatch, getState) {
        return deleteResource(`accounts/${account_id}`).then(
            response => dispatch(loadAccounts()),
            error => dispatch(errorOnFetch(error))
        );
    };
};
