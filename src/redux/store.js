import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import app from "./app";
import user from "./user";

const store = configureStore({
  reducer: { app, user },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat((api) => (next) => (action) => {
      const store = api.getState();

      const elapsedTime = store?.data?.elapsedTime;
      const duration = store?.data?.duration;

      if (Date.now() - elapsedTime <= duration) {
        action.store = {
          ...store,
          data: {}, // Delete data from store.data
        };
      }
      next(action);
    }),
});

export const persistor = persistStore(store);
export default store;
