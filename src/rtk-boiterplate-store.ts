import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // use this in useSelector hook
export type AppDispatch = typeof store.dispatch; // use this in useDispatch hook

export default store;
