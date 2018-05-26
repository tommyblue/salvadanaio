import {errorOnFetch, fetchResource} from './fetch';

export const LOADED_ANALYTICS_BALANCE = "LOADED_ANALYTICS_BALANCE";
export const LOADED_ANALYTICS_MOVEMENTS = "LOADED_ANALYTICS_MOVEMENTS";

export const loadAnalyticsBalance = () => {
    return (dispatch: any) => {
        return fetchResource(`analytics/balance`).then(
            (response: any) => dispatch(loadedAnalyticsBalance(response.data)),
            (error: any) => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAnalyticsBalance = (balance: any) => ({
    balance,
    type: LOADED_ANALYTICS_BALANCE,
});

export const loadAnalyticsMovements = () => {
    return (dispatch: any) => {
        return fetchResource(`analytics/movements`).then(
            (response: any) => dispatch(loadedAnalyticsMovements(response.data)),
            (error: any) => dispatch(errorOnFetch(error))
        );
    };
};

const loadedAnalyticsMovements = (movements: any) => ({
    movements,
    type: LOADED_ANALYTICS_MOVEMENTS,
});
