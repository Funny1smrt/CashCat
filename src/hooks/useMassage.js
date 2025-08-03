import { useCallback, useContext, useEffect } from "react";
import { MessageContext } from "../context/MessageContext";

function useMassage() {
  const { message, setMessage } = useContext(MessageContext);


  function showMessage(msg) {
    if (message.find((m) => m.message === msg)) return;
    setMessage((prev) => [...prev, { type: "message", message: msg }]);
  }

  function showError(msg) {
    if (message.find((m) => m.message === msg)) return;
    setMessage((prev) => [...prev, { type: "error", message: msg }]);
  }

  function showWarning(msg) {
    if (message.find((m) => m.message === msg)) return;
    setMessage((prev) => [...prev, { type: "warning", message: msg }]);
  }

  function showSuccess(msg) {
    if (message.find((m) => m.message === msg)) return;
    setMessage((prev) => [...prev, { type: "success", message: msg }]);
  }
  const closeMessage = useCallback(() => {
    setMessage((prev) => {
      const updated = prev.slice(1); // видалити найстаріше
      if (updated.length === 0) {
        (false); // ховаємо, якщо більше немає
      }
      return updated;
    });
  }, [setMessage, ]);

  useEffect(() => {
    if (message.length === 0) return;

    const timer = setTimeout(() => {
      closeMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, closeMessage]);

  return {
    showMessage,
    showError,
    showWarning,
    showSuccess,
    closeMessage,
  };
}

export default useMassage;
