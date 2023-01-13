import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";

const user = createSlice({
    name: 'user',
    initialState: {
        connected: false,
        //image: null,
    },
    reducers: {
        changeValues (state, actions) {
            const { token } = actions.payload;
            Object.keys(actions.payload).forEach(key => {
                state[key] = actions.payload[key]
            });
            if(token)
                state.connected = true;
        },
        updateValue(state, actions) {
            const {key, value} = actions.payload;
            state[key] = value;
        },
        deconnected (state) {
            state.connected = false;
        }
    }
});

export const { changeValues, deconnected, updateValue } = user.actions;
export default persistReducer({
    storage,
    key:'__ROOT_GEID_USER_CONFIG_APP'
}, 
user.reducer
);