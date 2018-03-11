import {fetchResource, saveResource, errorOnFetch} from './fetch';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";

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
    return function (dispatch) {
        return saveResource(`movements`, movement);
    };
};
