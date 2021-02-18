import { createStore, combineReducers } from "redux";
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducer';

const allReducers = combineReducers(
    authReducer,
    postsReducer
)

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store