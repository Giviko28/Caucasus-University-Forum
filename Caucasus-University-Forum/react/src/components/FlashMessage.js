import {useEffect, useState} from "react";
const FlashMessage = ({message}) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 1250);
        }
    }, [message]);

    return (
        <div className={`flash-message ${isVisible ? 'visible' : ''}`}>
            {message}
        </div>
    );
}

export default FlashMessage;
