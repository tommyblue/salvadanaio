import { ApiThunkAction, IGlobalState, IMovement } from '../types';
import { deleteResource, errorOnFetch, fetchResource, saveForm, saveResource } from './fetch';
import { setNotification } from './notification';

export const LOADED_MOVEMENT = "LOADED_MOVEMENT";
export const TOGGLE_MOVEMENTS_MODAL = "TOGGLE_MOVEMENTS_MODAL";
export const TOGGLE_UPLOAD_MOVEMENTS_MODAL = "TOGGLE_UPLOAD_MOVEMENTS_MODAL";

export const loadMovements = (accountId: string, dateRange: string): ApiThunkAction =>
    ((dispatch: any) => (
        fetchResource(`movements?account_id=${accountId}&date_range=${dateRange}`)
            .then(
                (response: any) =>
                    dispatch(loadedMovements(response.data)),
                (error: any) => dispatch(errorOnFetch(error))
            )
    ));

export const loadedMovements = (movements: IMovement[]) => ({
    movements,
    type: LOADED_MOVEMENT,
});

export const toggleUploadMovementsModal = () => ({
    type: TOGGLE_UPLOAD_MOVEMENTS_MODAL,
});

export const toggleMovementsModal = () => ({
    type: TOGGLE_MOVEMENTS_MODAL,
});

export const saveMovement = (movement: IMovement): ApiThunkAction =>
    ((dispatch: any, getState: () => IGlobalState) => (
        saveResource(`movements`, movement).then(
            (response: any) => {
                dispatch(loadMovements(
                    getState().selectedAccount,
                    getState().selectedDateRange,
                ));
                dispatch(setNotification('Movement successfully created', 'success'));
                return dispatch(toggleUploadMovementsModal());
            },
            (error: any): ApiThunkAction => dispatch(errorOnFetch(error))
        ))
    );

export const deleteMovement = (movementId: any): ApiThunkAction =>
    ((dispatch: any, getState: () => IGlobalState) => (
        deleteResource(`movements/${movementId}`).then(
            (response: any) => dispatch(loadMovements(
                getState().selectedAccount,
                getState().selectedDateRange,
            )),
            (error: any) => dispatch(errorOnFetch(error))
        ))
    );

export const uploadMovements = (accountId: string, file: any): ApiThunkAction =>
    ((dispatch: any, getState: () => IGlobalState) => {
            const formData = new FormData();
            formData.append('file', file)
            return saveForm(`accounts/${accountId}/movements/upload`, formData).then(
                (response: any) => {
                    dispatch(loadMovements(
                        getState().selectedAccount,
                        getState().selectedDateRange,
                    ));
                    dispatch(setNotification('Movement successfully uploaded', 'success'));
                    return dispatch(toggleMovementsModal());
                },
                (error: any) => dispatch(errorOnFetch(error))
            );
        }
    );
