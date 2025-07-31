import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";
import deepMerge from "../utils/deepMerge";

const initialState = {
  id: null,
  token: null,
  email: null,
  firstName: null,
  lastName: null,
  middleName: null,
  docTypes: null,
  number: null,
  image: null,
  grade: null,
  role: null,
  auth: null,
  connected: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, actions) {
      const { data } = actions.payload;
      const states = deepMerge(state, data);
      Object.keys(states).forEach((key) => {
        state[key] = states[key];
      });
    },
  },
});

export const { updateUser } = user.actions;
export default persistReducer(
  {
    storage,
    key: "__ROOT_GEID_USER_CONFIG_APP",
  },
  user.reducer
);
