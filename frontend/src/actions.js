export const CLICKED_ACCOUNT = "CLICKED_ACCOUNT";

export const clickAccount = (account_id) => {
    return {
        type: CLICKED_ACCOUNT,
        account_id,
    };
};

export const LOADED_ACCOUNT = "LOADED_ACCOUNT";
export const loadAccounts = () => {

    return function (dispatch) {
        return fetchAccounts().then(
            response => dispatch(loadedAccounts(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAccounts = (accounts) => ({
    type: LOADED_ACCOUNT,
    accounts,
});

const fetchAccounts = () => {
    return fetch('http://localhost:4000/api/v1/accounts').then(response => response.json());
}

export const ERROR_HAPPENED = "ERROR_HAPPENED";
const errorOnFetch = (error) => ({
    type: ERROR_HAPPENED,
    errors: error,
});
