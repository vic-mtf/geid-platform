import { createContext, useContext, useRef } from "react";

const Data = createContext(null);

export const RefProvider = ({children}) => {
    const value = useRef(null);
    return (
        <Data.Provider value={value}>
            {children}
        </Data.Provider>
    );
};

export default function useRefDocs () {
    const value = useContext(Data);
    return value;
}