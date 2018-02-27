import {CLICKED_ACCOUNT} from './actions';

const initialState = {
    accounts: [1, 2, 3],
    clickedAccount: null
};

const salvadanaioApp = (state = initialState, action) => {
    switch (action.type) {
        case CLICKED_ACCOUNT:
            return ({...state,
                clickedAccount: action.account_id
            });
        default:
            return state
    }
};

export default salvadanaioApp;
