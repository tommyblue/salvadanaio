import {fetchResource, saveResource, deleteResource, errorOnFetch} from './fetch';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";
export const TOGGLE_MOVEMENTS_MODAL = "TOGGLE_MOVEMENTS_MODAL";

export const loadMovements = (params) => {
    return function (dispatch) {
        const url = `movements?account_id=${params.accountId}&date_range=${params.dateRange}`;
        return fetchResource(url).then(
            response => dispatch(loadedMovements(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

export const emptyMovements = () => ({
    type: LOADED_MOVEMENT,
    movements: [],
});

const loadedMovements = (movements) => ({
    type: LOADED_MOVEMENT,
    movements,
});

export const saveMovement = (movement) => {
    return function (dispatch, getState) {
        return saveResource(`movements`, movement).then(
            response => {
                dispatch(loadMovements({
                    accountId: getState().selectedAccount,
                    dateRange: getState().selectedDateRange,
                }));
                return dispatch(toggleShowMovementsModal());
            },
            error => dispatch(errorOnFetch(error))
        );
    };
};

export const toggleShowMovementsModal = () => ({
    type: TOGGLE_MOVEMENTS_MODAL,
});

export const deleteMovement = (movement_id) => {
    return function (dispatch, getState) {
        return deleteResource(`movements/${movement_id}`).then(
            response => dispatch(loadMovements({
                accountId: getState().selectedAccount,
                dateRange: getState().selectedDateRange,
            })),
            error => dispatch(errorOnFetch(error))
        );
    };
};
