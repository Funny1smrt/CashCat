import Modal from "../components/Modal";
import useTransaction from "../hooks/useTransaction";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
function ItemTransaction({ transaction, index }) {
    const { reverseTransaction } = useTransaction();
    const { setIsModalOpen, isModalOpen } = useContext(TransactionContext);
    return (
        <div
            className="border m-2 p-2 w-full max-w-md">
            <h2 className="text-xl font-bold">{transaction.account}</h2>

            {transaction.type === "spend" ? (
                <h3 className="text-xl text-red-500 font-bold ">- Витрата</h3>
            ) : (
                <h3 className="text-xl text-green-500 font-bold ">+ Дохід</h3>
            )
            }
            <p>Дата: {transaction.date.day}.{transaction.date.month}.{transaction.date.year}
                {" " + transaction.date.hour + ":" + transaction.date.minute}
            </p>
            <p>{transaction.name}</p>
            <p> {transaction.category}</p>

            <p>Сума: {transaction.type === "spend" ? transaction.amount * -1 : transaction.amount} грн.</p>

            <Modal key={transaction.id} isOpen={isModalOpen === transaction.id} onClose={() => { setIsModalOpen(-1) }}>
                <p>Опис: {transaction.description ? transaction.description : "Немає опису"}</p>
                <p>Було: {transaction.allMoney} грн.</p>
                <p>Стало: {transaction.afterMoney} грн.</p>
                <p>Дата: {transaction.date.day}.{transaction.date.month}.{transaction.date.year}
                    {" " + transaction.date.hour + ":" + transaction.date.minute}
                </p>
                <button
                    className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                    onClick={() => {
                        reverseTransaction(transaction.id);
                        setIsModalOpen(-1);
                    }}
                >
                    Видалити
                </button>
            </Modal>
            <button
                onClick={() => setIsModalOpen(transaction.id || index)}
                className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
            >
                Детальніше
            </button>
        </div>
    );
}
export default ItemTransaction;