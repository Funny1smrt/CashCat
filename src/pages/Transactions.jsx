// import useTransaction from "../hooks/useTransaction";
import NavBar from "../components/NavBar";
import ItemTransaction from "../components/ItemTransaction";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { TransactionContext } from "../context/TransactionContext";

function Transactions() {

    const { transactions } = useContext(TransactionContext);
    const { activeAccount } = useContext(AccountContext);

    return (
        <>
            <div className="flex flex-col gap-4 p-4 justify-start items-center h-full w-full mb-20">
                <h1 className="text-2xl font-bold">Транзакції {activeAccount.name}</h1>
                <div className="flex flex-col justify-center items-center gap-2">
                    {transactions.filter((transaction) => transaction.account === activeAccount.name).reverse().map((transaction, index) => (
                        <ItemTransaction key={transaction.id || index}
                        transaction={transaction}
                        />
                    ))}
                </div>
                {transactions.filter((transaction) => transaction.account === activeAccount.name).length === 0 && <p>Немає транзакцій</p>}
                </div>

            <NavBar />
        </>
    );
}
export default Transactions;