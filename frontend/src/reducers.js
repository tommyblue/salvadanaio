import {
    ERROR_HAPPENED,
    LOADED_ACCOUNT,
    LOADED_ANALYTICS_BALANCE,
    LOADED_ANALYTICS_MOVEMENTS,
    LOADED_MOVEMENT,
    SELECT_ACCOUNT,
    SELECT_CATEGORY,
    SELECT_DATERANGE,
} from './actions';

const initialState = {
    accounts: [],
    movements: [],
    selectedAccount: undefined,
    selectedCategory: "",
    selectedDateRange: 30,
    analytics: {
        balance: [],
        movements: [],
    },
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        // ACCOUNTS
        case LOADED_ACCOUNT:
            return ({...state,
                accounts: action.accounts
            });
        case SELECT_ACCOUNT:
            return ({...state,
                selectedAccount: action.account_id
            });
        // MOVEMENTS
        case LOADED_MOVEMENT:
            return ({...state,
                movements: action.movements
            });
        // CATEGORIES
        case SELECT_CATEGORY:
            return ({...state,
                selectedCategory: action.category_id
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
        // GENERIC
        case SELECT_DATERANGE:
            return ({...state,
                selectedDateRange: action.dateRange
            });
        case ERROR_HAPPENED:
            return ({...state,
                errors: action.errors
            });
        default:
            return state
    }
};

export default mainReducer;
