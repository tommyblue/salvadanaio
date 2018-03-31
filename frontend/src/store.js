import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import mainReducer from './reducers';

const store = createStore(
    mainReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
export default store;
