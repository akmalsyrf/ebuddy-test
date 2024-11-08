import { Action, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers";
import { userReducer } from "./reducers";
import { thunk, ThunkAction } from "redux-thunk";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
