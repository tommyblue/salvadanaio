export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION,
});

export const setNotification = (notification: any, notificationState='success') => ({
    notification,
    notificationState,
    type: SET_NOTIFICATION,
});
