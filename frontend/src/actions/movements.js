import {fetchResource, errorOnFetch} from './fetch';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";

export const loadMovements = (account_id) => {
    return function (dispatch) {
        return fetchResource(`movements?account_id=${account_id}`).then(
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
