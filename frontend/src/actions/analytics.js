import {fetchResource, errorOnFetch} from './fetch';

export const LOADED_ANALYTICS_BALANCE = "LOADED_ANALYTICS_BALANCE";
export const LOADED_ANALYTICS_MOVEMENTS = "LOADED_ANALYTICS_MOVEMENTS";

export const loadAnalyticsBalance = (params) => {
    return function (dispatch) {
        return fetchResource(`analytics/balance`).then(
            response => dispatch(loadedAnalyticsBalance(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAnalyticsBalance = (balance) => ({
    type: LOADED_ANALYTICS_BALANCE,
    balance,
});

export const loadAnalyticsMovements = (params) => {
    return function (dispatch) {
        return fetchResource(`analytics/movements`).then(
            response => dispatch(loadedAnalyticsMovements(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAnalyticsMovements = (movements) => ({
    type: LOADED_ANALYTICS_MOVEMENTS,
    movements,
});
