import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { ICounterState, counterReducer } from "./features/counter/counterSlice";
import { IAuthState, authReducer } from "./features/auth/authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { myLoggerMiddleware } from "@/redux/middlewares/myLogger";
import { apiService } from "@/redux/api/base";

// server-side rendering  no operation ( noop )
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("session") // session , local
    : createNoopStorage();

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [apiService.reducerPath]: apiService.reducer,
}) as Reducer<{
  counter: ICounterState;
  auth: IAuthState;
  [apiService.reducerPath]: ReturnType<typeof apiService.reducer>;
}>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // rootReducer key
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiService.middleware)
      .concat(myLoggerMiddleware),
});

setupListeners(store.dispatch); // related to RTK Query

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
