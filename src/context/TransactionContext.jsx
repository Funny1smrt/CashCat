import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { TransactionContext } from "./TransactionContext";

function TransactionProvider({ children }) {

    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [planes, setPlanes] = useLocalStorage("planes", []);

    const [money, setMoney] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSpendModalOpen, setIsSpendModalOpen] = useState(false);
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [inputs, setInputs] = useState({
        spend: "",
        category: "",
        income: "",
        date: "",
        isPeriod: false,
        account: "",
        accountName: "",
        balance: "",
        updateName: "",
        limit: "",
    });
    

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                setTransactions,
                planes,
                setPlanes,
                money,
                setMoney,
                isModalOpen,
                setIsModalOpen,
                isSpendModalOpen,
                setIsSpendModalOpen,
                isIncomeModalOpen,
                setIsIncomeModalOpen,
                inputs,
                setInputs,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;