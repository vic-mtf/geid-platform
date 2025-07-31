import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import appConfig from "../configs/app-config.json";
import deepMerge from "../utils/deepMerge";

const {
  lang,
  colors: {
    primary: { mode },
  },
} = appConfig;

const app = createSlice({
  name: "app",
  initialState: {
    theme: { mode, opacity: 0.75, blur: 15 },
    lang,
    users: [],
    user: {
      stayConnected: false,
      data: null,
    },
  },
  reducers: {
    updateApp(state, actions) {
      const { data } = actions.payload;
      const states = deepMerge(state, data);
      Object.keys(states).forEach((key) => {
        state[key] = states[key];
      });
    },
  },
});

export const { updateApp } = app.actions;

export default persistReducer(
  {
    storage,
    key: "__ROOT_GEID_GLOBAL_CONFIG_APP",
  },
  app.reducer
);
