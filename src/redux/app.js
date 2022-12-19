import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import appConfig from '../configs/app-config.json';

const { lang, colors: { primary: { mode } } } = appConfig;

const app = createSlice({
    name: 'theme',
    initialState: { mode, lang, },
    reducers: {
        switchTheme (state, actions) {
            state.mode = actions.payload || mode;
        },
        changeLang (state, actions) {
            state.lang = actions.payload || lang;
        }
    }
});

export const { 
    switchTheme, 
    changeLang,
} = app.actions;

export default persistReducer({
        storage,
        key:'__ROOT_GEID_GLOBAL_CONFIG_APP'
    }, 
    app.reducer
);