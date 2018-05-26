import { deleteResource, errorOnFetch, fetchResource, saveForm, saveResource } from './fetch';
import { setNotification } from './notification';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";
export const TOGGLE_MOVEMENTS_MODAL = "TOGGLE_MOVEMENTS_MODAL";
export const TOGGLE_UPLOAD_MOVEMENTS_MODAL = "TOGGLE_UPLOAD_MOVEMENTS_MODAL";

export const loadMovements = (params: any) => ((dispatch: any) => (
    fetchResource(`movements?account_id=${params.accountId}&date_range=${params.dateRange}`)
        .then(
            (response: any) => dispatch(loadedMovements(response.data)),
            (error: any) => dispatch(errorOnFetch(error))
        )
));

export const emptyMovements = () => ({
    movements: [],
    type: LOADED_MOVEMENT,
});

const loadedMovements = (movements: any) => ({
    movements,
    type: LOADED_MOVEMENT,
});

export const saveMovement = (movement: any) => ((dispatch: any, getState: any) => (
    saveResource(`movements`, movement).then(
        (response: any) => {
            dispatch(loadMovements({
                accountId: getState().selectedAccount,
                dateRange: getState().selectedDateRange,
            }));
            dispatch(setNotification('Movement successfully created', 'success'));
            return dispatch(toggleShowMovementsModal());
        },
        (error: any) => dispatch(errorOnFetch(error))
    ))
);

export const toggleShowMovementsModal = () => ({
    type: TOGGLE_MOVEMENTS_MODAL,
});

export const deleteMovement = (movementId: any) => ((dispatch: any, getState: any) => (
    deleteResource(`movements/${movementId}`).then(
        (response: any) => dispatch(loadMovements({
            accountId: getState().selectedAccount,
            dateRange: getState().selectedDateRange,
        })),
        (error: any) => dispatch(errorOnFetch(error))
    ))
);

export const toggleShowUploadMovementsModal = () => ({
    type: TOGGLE_UPLOAD_MOVEMENTS_MODAL,
});

export const uploadMovements = (accountId: any, file: any) => ((dispatch: any, getState: any) => {
        const formData = new FormData();
        formData.append('file', file)
        return saveForm(`accounts/${accountId}/movements/upload`, formData).then(
            (response: any) => {
                dispatch(loadMovements({
                    accountId: getState().selectedAccount,
                    dateRange: getState().selectedDateRange,
                }));
                dispatch(setNotification('Movement successfully uploaded', 'success'));
                return dispatch(toggleShowUploadMovementsModal());
            },
            (error: any) => dispatch(errorOnFetch(error))
        );
    }
);
