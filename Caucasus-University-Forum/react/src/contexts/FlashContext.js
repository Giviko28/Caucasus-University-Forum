import {createContext, useContext, useState} from "react";

const FlashContext = createContext({
    message: null,
    setMessage: () => {}
})

export const FlashProvider = ({children}) => {
    const [message, _setMessage] = useState(null);
    const setMessage = (message) => {
        _setMessage(message);
        setTimeout(() => {
            _setMessage(null);
        }, 2000)
    }
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
