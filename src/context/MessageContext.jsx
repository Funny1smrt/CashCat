import { useState } from "react";
import { MessageContext } from "./MessageContext";

function MessageProvider({ children }) {
    const [message, setMessage] = useState([]);


    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export default MessageProvider;