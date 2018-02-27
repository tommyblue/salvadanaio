import {fetchResource, errorOnFetch} from './fetch';

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";

export const loadAccounts = () => {
    return function (dispatch) {
        return fetchResource('accounts').then(
            response => dispatch(loadedAccounts(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAccounts = (accounts) => ({
    type: LOADED_ACCOUNT,
    accounts,
});


