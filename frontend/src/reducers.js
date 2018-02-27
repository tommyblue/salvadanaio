import {LOADED_ACCOUNT, LOADED_MOVEMENT, ERROR_HAPPENED} from './actions';

const initialState = {
    accounts: [],
    movements: [],
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        // ACCOUNTS
        case LOADED_ACCOUNT:
            return ({...state,
                accounts: action.accounts
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
