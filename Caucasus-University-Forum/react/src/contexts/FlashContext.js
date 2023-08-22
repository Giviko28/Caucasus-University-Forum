import {createContext, useContext, useState} from "react";

const FlashContext = createContext({
    message: null,
    setMessage: () => {}
})

export const FlashProvider = ({children}) => {
    const [message, setMessage] = useState(null);
    return (
        <FlashContext.Provider value={{
            message,
            setMessage
        }}>
            {children}
        </FlashContext.Provider>
    );
}

export const useFlashContext = () => useContext(FlashContext);
