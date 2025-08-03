import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
    // Закриття по ESC
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-60"
            onClick={onClose}
        >
            <div
                className="bg-white gap-2 rounded-xl border p-6 min-w-[300px] max-w-md min-h-[200px] max-h-[80%] overflow-y-auto flex flex-col justify-evenly"
                onClick={(e) => e.stopPropagation()} // щоб не закривалось при кліку всередині
            >
                {children}
            </div>
        </div>
    );
}
