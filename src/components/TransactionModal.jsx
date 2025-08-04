import useTransaction from "../hooks/useTransaction";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { CategoryContext } from "../context/CategoryContext";
import Modal from "../components/Modal";

function TransactionModal() {
    const {
        spendMoney,
        incomeMoney,
        handleInputChange,
        handleCheckboxChange,
        agreed,
    } = useTransaction();
    const { inputs, isSpendModalOpen,
        setIsSpendModalOpen, isIncomeModalOpen,
        setIsIncomeModalOpen } = useContext(TransactionContext);
    const { categories } = useContext(CategoryContext);


    return (
        <div>
            <div
                className="flex flex-row justify-center items-center gap-2">
                <button
                    onClick={() => { setIsSpendModalOpen(true); }}
                    className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                >
                    -
                </button>
                <button
                    onClick={() => { setIsIncomeModalOpen(true); }}
                    className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                >
                    +
                </button>
            </div>
            <Modal isOpen={isSpendModalOpen} onClose={() => setIsSpendModalOpen(false)}>
                {/* Ensure inputs.category is not undefined by providing a default empty string */}
                <select name="category" id="category" onChange={handleInputChange} value={inputs.category || ""} className="p-2 border">
                    {categories.length === 0 ? <option value="">Немає категорій</option> :
                        <option value="">Виберіть категорію</option>
                    }
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    className="p-2 border"
                    type="number"
                    name="spend"
                    value={inputs.spend}
                    placeholder="Сума"
                    onChange={handleInputChange}
                />
                <label htmlFor="isPeriod">Періодична витрата</label>

                <input
                    className="p-2 border"
                    type="checkbox"
                    name="isPeriod"
                    checked={agreed}
                    onChange={handleCheckboxChange}
                />
                <button
                    className="border p-2"
                    onClick={spendMoney}>Витрата</button>
                
            </Modal>

            <Modal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)}>
                <input
                    className="p-2 border"
                    type="text"
                    name="category"
                    placeholder="Категорія"
                    onChange={handleInputChange}
                    value={inputs.category || ""}
                    list="category"
                />
                <datalist name="category" id="category">
                    {categories.map((category, index) => (
                        <option key={index} value={category}></option>
                    ))}
                </datalist>
                <input
                    className="p-2 border"
                    type="number"
                    name="income"
                    placeholder="Сума"
                    value={inputs.income}
                    onChange={handleInputChange}
                />
                <label htmlFor="isPeriod">Періодичний дохід</label>

                <input
                    className="p-2 border"
                    type="checkbox"
                    name="isPeriod"
                    checked={agreed}
                    onChange={handleCheckboxChange}
                />
                <button
                    className="border p-2"
                    onClick={incomeMoney}
                >Дохід</button>
            </Modal>
        </div>
    );
}
export default TransactionModal;