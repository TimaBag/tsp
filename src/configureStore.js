import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from 'oldPage/reducers/index';
import _ from 'lodash';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {}
};

const configureStore = () => {
  const middlewares = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({ collapsed: true }));
  }
  const store = createStore(
    rootReducer,
    loadState(),
    applyMiddleware(...middlewares));

  store.subscribe(_.throttle(() => {
    saveState({
      auth: {
        isLoggedIn: store.getState().auth.isLoggedIn,
      },
      contract : store.getState().contract,
      user: store.getState().user,
      company: {
        tariffs: store.getState().company.tariffs
      }
    });
  }, 1000));


  return store;
};

export default configureStore;
