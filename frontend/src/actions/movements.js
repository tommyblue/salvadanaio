import {fetchResource, errorOnFetch} from './fetch';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";

export const loadMovements = () => {
    return function (dispatch) {
        return fetchResource('movements').then(
            response => dispatch(loadedMovements(response.data)),
            error => dispatch(errorOnFetch(error))
        );
    };
};

const loadedMovements = (movements) => ({
    type: LOADED_MOVEMENT,
    movements,
});
