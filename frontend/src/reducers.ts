import {
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SIGNOUT,
    AUTHENTICATION_SUCCEDED,
    LOADED_ACCOUNT,
    LOADED_ANALYTICS_BALANCE,
    LOADED_ANALYTICS_MOVEMENTS,
    LOADED_CATEGORY,
    LOADED_MOVEMENT,
    REMOVE_NOTIFICATION,
    SELECT_ACCOUNT,
    SELECT_CATEGORY,
    SELECT_DATERANGE,
    SET_NOTIFICATION,
    TOGGLE_ACCOUNTS_MODAL,
    TOGGLE_MOVEMENTS_MODAL,
    TOGGLE_UPLOAD_MOVEMENTS_MODAL,
} from './actions';
import { getAuthToken } from './actions/auth';

const initialState = {
    accounts: [],
    analytics: {
        balance: [],
        movements: [],
    },
    categories: [],
    isAuthenticated: getAuthToken() !== undefined,
    movements: [],
    notification: '',
    notificationState: 'success',
    selectedAccount: undefined,
    selectedCategory: "",
    selectedDateRange: 30,
    showAccountsModal: false,
    showMovementsModal: false,
    showUploadMovementsModal: false,
};

const mainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        // AUTH
        case AUTHENTICATION_SUCCEDED:
            return ({...state,
                isAuthenticated: true,
            });
        case AUTHENTICATION_FAILED:
        case AUTHENTICATION_SIGNOUT:
            return ({...state,
                isAuthenticated: false,
            });
        // ACCOUNTS
        case LOADED_ACCOUNT:
            return ({...state,
                accounts: action.accounts,
            });
        case SELECT_ACCOUNT:
            return ({...state,
                selectedAccount: action.account_id,
            });
        case TOGGLE_ACCOUNTS_MODAL:
            return ({...state,
                showAccountsModal: !state.showAccountsModal,
            });
        // CATEGORIES
        case LOADED_CATEGORY:
            return ({...state,
                categories: action.categories,
            });
        // MOVEMENTS
        case LOADED_MOVEMENT:
            return ({...state,
                movements: action.movements,
            });
        case TOGGLE_MOVEMENTS_MODAL:
            return ({...state,
                showMovementsModal: !state.showMovementsModal,
            });
        case TOGGLE_UPLOAD_MOVEMENTS_MODAL:
            return ({...state,
                showUploadMovementsModal: !state.showUploadMovementsModal,
            });
        // CATEGORIES
        case SELECT_CATEGORY:
            return ({...state,
                selectedCategory: action.category_id,
            });
        // ANALYTICS
        case LOADED_ANALYTICS_BALANCE:
            return ({...state,
                analytics: {
                    ...state.analytics,
                    balance: action.balance,
                }
            });
        case LOADED_ANALYTICS_MOVEMENTS:
            return ({...state,
                analytics: {
                    ...state.analytics,
                    movements: action.movements,
                }
            });
        // NOTIFICATIONS
        case SET_NOTIFICATION:
            return ({...state,
                notification: action.notification,
                notificationState: action.notificationState,
            });
        case REMOVE_NOTIFICATION:
            return ({...state,
                notification: '',
            });
        // GENERIC
        case SELECT_DATERANGE:
            return ({...state,
                selectedDateRange: action.dateRange,
            });
        default:
            return state
    }
};

export default mainReducer;
