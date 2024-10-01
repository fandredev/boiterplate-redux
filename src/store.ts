import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducers = combineReducers({
  // combine all reducers
  account: accountReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducers>; // use this in useSelector hook
export type AppDispatch = typeof store.dispatch; // use this in useDispatch hook

const store = createStore(
  rootReducers,
  undefined,
  composeWithDevTools(applyMiddleware(thunk))
); // create store

export default store;
