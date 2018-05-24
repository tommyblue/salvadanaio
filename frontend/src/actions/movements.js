import { fetchResource, saveForm, saveResource, deleteResource, errorOnFetch } from './fetch';
import { setNotification } from './notification';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";
export const TOGGLE_MOVEMENTS_MODAL = "TOGGLE_MOVEMENTS_MODAL";
export const TOGGLE_UPLOAD_MOVEMENTS_MODAL = "TOGGLE_UPLOAD_MOVEMENTS_MODAL";

export const loadMovements = (params) => ((dispatch) => (
    fetchResource(`movements?account_id=${params.accountId}&date_range=${params.dateRange}`)
        .then(
            response => dispatch(loadedMovements(response.data)),
            error => dispatch(errorOnFetch(error))
        )
));

export const emptyMovements = () => ({
    type: LOADED_MOVEMENT,
    movements: [],
});

const loadedMovements = (movements) => ({
    type: LOADED_MOVEMENT,
    movements,
});

export const saveMovement = (movement) => ((dispatch, getState) => (
    saveResource(`movements`, movement).then(
        response => {
            dispatch(loadMovements({
                accountId: getState().selectedAccount,
                dateRange: getState().selectedDateRange,
            }));
            dispatch(setNotification('Movement successfully created', 'success'));
            return dispatch(toggleShowMovementsModal());
        },
        error => dispatch(errorOnFetch(error))
    ))
);

export const toggleShowMovementsModal = () => ({
    type: TOGGLE_MOVEMENTS_MODAL,
});

export const deleteMovement = (movement_id) => ((dispatch, getState) => (
    deleteResource(`movements/${movement_id}`).then(
        response => dispatch(loadMovements({
            accountId: getState().selectedAccount,
            dateRange: getState().selectedDateRange,
        })),
        error => dispatch(errorOnFetch(error))
    ))
);

export const toggleShowUploadMovementsModal = () => ({
    type: TOGGLE_UPLOAD_MOVEMENTS_MODAL,
});

export const uploadMovements = (account_id, file) => ((dispatch, getState) => {
        const formData = new FormData();
        formData.append('file', file)
        return saveForm(`accounts/${account_id}/movements/upload`, formData).then(
            response => {
                dispatch(loadMovements({
                    accountId: getState().selectedAccount,
                    dateRange: getState().selectedDateRange,
                }));
                dispatch(setNotification('Movement successfully uploaded', 'success'));
                return dispatch(toggleShowUploadMovementsModal());
            },
            error => dispatch(errorOnFetch(error))
        );
    }
);
