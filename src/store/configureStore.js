import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import api from '../api';
import user from '../reducers/user';
import activities from '../reducers/activities';

const rootReducer = combineReducers({
  user,
  activities
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
  );

  return store;
}
