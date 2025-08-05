import { NavigationContext } from "./NavigationContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavigationProvider({ children }) {
    const navigate = useNavigate();
    const [page, setPage] = useState("");

    useEffect(() => {
        setPage(window.location.pathname);
    }, [navigate]);


    function goToAccounts() {
        navigate("/accounts");
        setPage("/accounts");
    }

    function goToSettings() {
        navigate("/settings");
        setPage("/settings");
    }

    function goToPlanes() {
        navigate("/planes");
        setPage("/planes");
    }

    function goToTransactions() {
        navigate("/transactions");
        setPage("/transactions");
    }

    function goToHome() {
        navigate("/");
        setPage("/");
    }

    function goBack() {
        navigate(-1);
    }

    function goForward() {
        navigate(1);
    }

    return (
        <NavigationContext.Provider value={{
            goToAccounts,
            goToSettings,
            goToPlanes,
            goToTransactions,
            goToHome,
            goBack,
            goForward,
            page,
            setPage
        }}>
            {children}
        </NavigationContext.Provider>
    );
}

export default NavigationProvider;