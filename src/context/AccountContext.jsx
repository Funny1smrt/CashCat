import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { AccountContext } from "./AccountContext";

function AccountProvider ({ children }) {
    const [accounts, setAccounts] = useLocalStorage("accounts", []);
    const [editAccount, setEditAccount] = useState(null);
    const [position, setPosition] = useState(0);
    const [activeAccount, setActiveAccount] = useState(accounts[position]);

    useEffect(() => {
        setActiveAccount(accounts[position]);
    }, [accounts, position]);



    return (
        <AccountContext.Provider
            value={{
                accounts,
                setAccounts,
                editAccount,
                setEditAccount,
                position,
                setPosition,
                activeAccount,
                setActiveAccount
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;