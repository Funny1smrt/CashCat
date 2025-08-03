import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
export default function Messages() {
    const { message } = useContext(MessageContext);
    if (message.length === 0) {
        return null;
    }
    const type = (type) => {
        switch (type) {
            case "message": return "bg-green-500"
            case "error": return "bg-red-500"
            case "warning": return "bg-yellow-500"
            case "success": return "bg-green-500"
            default: return "bg-gray-500"
        }
    }
    return (
        <div
            className={`fixed top-0.5 left-0.5 p-4 z-99 w-fit gap-1 flex flex-col`}
        >
            {message.map((m, index) => (

                <div className={` px-4 py-2 rounded ${type(m.type)}`}
                    key={index}>
                    <p >
                        {m.message}</p>
                </div>
            ))}

        </div>
    );
}