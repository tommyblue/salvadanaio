import {CLICKED_ACCOUNT, LOADED_ACCOUNT, ERROR_HAPPENED} from './actions';

const initialState = {
    accounts: [],
    clickedAccount: null
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICKED_ACCOUNT:
            return ({...state,
                clickedAccount: action.account_id
            });
        case LOADED_ACCOUNT:
            return ({...state,
                accounts: action.accounts
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
