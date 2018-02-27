import {
    ERROR_HAPPENED,
    LOADED_ACCOUNT,
    LOADED_MOVEMENT,
    SELECT_ACCOUNT,
} from './actions';

const initialState = {
    accounts: [],
    movements: [],
    selectedAccount: 0,
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
        // GENERIC
        case ERROR_HAPPENED:
            return ({...state,
                errors: action.errors
            });
        default:
            return state
    }
};

export default mainReducer;
