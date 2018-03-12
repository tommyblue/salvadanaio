import {fetchResource, saveResource, errorOnFetch} from './fetch';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";
export const TOGGLE_MOVEMENTS_MODAL = "TOGGLE_MOVEMENTS_MODAL";

export const loadMovements = (params) => {
    return function (dispatch) {
        return fetchResource(`movements?account_id=${params.accountId}&date_range=${params.dateRange}`).then(
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
