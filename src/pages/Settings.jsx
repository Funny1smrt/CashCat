import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import useTransaction from "../hooks/useTransaction";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { CategoryContext } from "../context/CategoryContext";
import { NavigationContext } from "../context/NavigationContext";
import useCategory from "../hooks/useCategory";


function Settings() {

    const { goToAccounts } = useContext(NavigationContext);

    const {
        handleInputChange, resetAll
    } = useTransaction();

    const { addCategory, removeCategory } = useCategory();

    const { inputs, setIsModalOpen, isModalOpen,
    } = useContext(TransactionContext);

    const { categories, setIsCategoryModalOpen, isCategoryModalOpen } = useContext(CategoryContext);
    return (
        <>

            <div className="flex flex-col gap-4 p-4 justify-start items-center h-screen w-screen">
                <h1 className="text-2xl font-bold">Налаштування</h1>
                <p>Тут ви можете налаштувати ваші параметри.</p>
                <p>Ви можете скинути всі дані, але це не можна буде скасувати.</p>
                <button
                    className="border p-2"
                    onClick={() => setIsModalOpen(true)}>Скинути всі дані</button>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <p>Ви впевнені, що хочете скинути всі дані? Це не можна буде скасувати.</p>
                    <button
                        className="border p-2 mt-4"
                        onClick={resetAll}>Так, скинути</button>
                    <button
                        className="border p-2 mt-2"
                        onClick={() => setIsModalOpen(false)}>Скасувати</button>
                </Modal>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-xl font-bold">Керування категоріями</h2>
                    <p>Тут ви можете додати або видалити категорії для ваших транзакцій.</p>
                    <p>Наразі доступні категорії:</p>
                    <ul className="list-disc pl-5">
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <li key={index} className="my-2">
                                    {category}
                                </li>
                            ))
                        ) : (
                            <p>Немає категорій</p>
                        )}
                    </ul>
                    <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                    >
                        Керування категоріями
                    </button>
                    <Modal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)}>
                        <h2 className="text-2xl font-bold">Категорії</h2>
                        <ul className="list-disc pl-5">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <li key={index} className="my-2">
                                        {category}
                                        <button
                                            className="ml-4 text-red-500 hover:text-red-700"
                                            onClick={() => removeCategory(category)}
                                        >
                                            Видалити
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>Немає категорій</p>
                            )}
                        </ul>
                        <input
                            className="p-2 border"
                            type="text"
                            name="category"
                            placeholder="Додати нову категорію"
                            onChange={handleInputChange}
                            value={inputs.category || ""}
                        />
                        <button
                            className="border p-2"
                            onClick={addCategory}>Додати</button>
                    </Modal>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-xl font-bold">Керування акаунтами</h2>

                    <button 
                        className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                        onClick={goToAccounts}
                    >
                        Керування рахунками
                    </button>
                </div>
            </div>
            <NavBar />
        </>
    );
}

export default Settings;