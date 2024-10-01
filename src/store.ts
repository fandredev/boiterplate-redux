import { combineReducers, legacy_createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducers = combineReducers({
  // combine all reducers
  account: accountReducer,
  customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducers>; // use this in useSelector hook
export type AppDispatch = typeof store.dispatch; // use this in useDispatch hook

const store = legacy_createStore(rootReducers); // create store

export default store;
