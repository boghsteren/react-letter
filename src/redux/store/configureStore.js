import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      games: reducer("games"),
      user: reducer("user", {}),
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
