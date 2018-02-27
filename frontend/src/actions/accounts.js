import {fetchResource, errorOnFetch} from './fetch';
import {emptyMovements} from './movements';

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";
export const SELECT_ACCOUNT = "SELECT_ACCOUNT";

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
