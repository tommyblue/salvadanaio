export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const removeNotification = () => ({
    type: REMOVE_NOTIFICATION,
});

export const setNotification = (notification, notificationState='success') => ({
    type: SET_NOTIFICATION,
    notification,
    notificationState,
});
