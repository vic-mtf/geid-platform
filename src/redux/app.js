import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import appConfig from '../configs/app-config.json';

const { lang, colors: { primary: { mode } } } = appConfig;

const app = createSlice({
    name: 'app',
    initialState: { 
        mode, 
        lang, 
        opacity: .75,
        blur: 15,
        users: [],
        user: null,
        stayConnected: false,
    },
    reducers: {
        switchTheme (state, actions) {
            state.mode = actions.payload || mode;
        },
        changeLang (state, actions) {
            state.lang = actions.payload || lang;
        },
        setUser (state, actions) {
            state.user = actions.payload;
        },
        removeUser(state, actions) {
            const index = actions.payload;
            if(typeof index === 'number') 
                delete state.users[index];
            else state.user = null;
        }
    }
});

export const { 
    switchTheme, 
    changeLang, 
    removeUser,
    setUser,
} = app.actions;

export default persistReducer({
        storage,
        key:'__ROOT_GEID_GLOBAL_CONFIG_APP'
    }, 
    app.reducer
);