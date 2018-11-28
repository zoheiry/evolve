import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from '../api';
import user from '../reducers/user';

const rootReducer = combineReducers({
  user
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk.withExtraArgument(api)))
  );

  return store;
}
