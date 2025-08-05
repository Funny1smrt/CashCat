import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { TransactionContext } from "../context/TransactionContext";
import { AccountContext } from "../context/AccountContext";
import { NavigationContext } from "../context/NavigationContext";
import { useContext } from "react";
import Messages from "../components/Messages";
function Home() {
    const { goToAccounts } = useContext(NavigationContext);
    const { money, transactions } = useContext(TransactionContext);
    const { accounts, position, setPosition, activeAccount } = useContext(AccountContext);
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 h-full w-full mb-20">

                <h1 className="text-3xl sticky top-0">Всього грошей: {money} грн.</h1>
                <div className="flex flex-row justify-center items-center gap-2 overflow-x-scroll w-full">

                    {accounts.length > 0 &&
                        <div
                            className="flex flex-row justify-center items-center gap-2">
                            {accounts.length > 1 &&
                                <button className="border p-2 text-xs" onClick={() => position > 0 && setPosition(position - 1)}><p>Назад</p></button>}
                            <Card />
                            {accounts.length > 1 &&
                                <button className="border p-2 text-xs" onClick={() => position < accounts.length - 1 && setPosition(position + 1)}>Вперед</button>}
                        </div>
                    }
                </div>
                {accounts.length === 0 && <p>Немає акаунтів</p>}
                <button className="border p-1 text-xs rounded-3xl" onClick={goToAccounts}>Усі рахунки</button>

                <div className="flex flex-col justify-center items-center gap-2 border-t w-full">
                    <p>Останні транзакції</p>
                    {transactions.filter((transaction) => transaction.account === activeAccount.name).length === 0 && <p>Немає транзакцій</p>}
                    {transactions.length > 0 &&
                        <div className="flex flex-col justify-center items-center gap-2">
                            {transactions.filter((transaction) => transaction.account === activeAccount.name).reverse().slice(0, 5).map((transaction, index) => (
                                <div key={transaction.id || index} className="flex flex-row justify-center items-center gap-2">
                                    <p>{transaction.type==="spend"?"-":"+"}</p>
                                    <p>{transaction.amount} грн.</p>
                                    <p>{transaction.date.hour}:{transaction.date.minute}</p>
                                    <p>{transaction.date.day}.{transaction.date.month}.{transaction.date.year}</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>

                <Messages />
            </div>
            <NavBar />
        </>
    );
}


export default Home;
