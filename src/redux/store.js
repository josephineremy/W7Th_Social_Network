import { createStore, combineReducers } from "redux";
import authReducer from './reducers/authReducer';
import postsReducer from './reducers/postsReducer';

const globalReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer
  });

const store = createStore(
    globalReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store