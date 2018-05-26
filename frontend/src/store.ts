import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import mainReducer from './reducers';

const store = createStore(
    mainReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
export default store;
