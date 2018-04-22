import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import contentReducer from './reducers/contentReducer';

const reducers = combineReducers({
  contentReducer: contentReducer
});

var store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;

