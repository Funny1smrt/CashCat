import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import useAccounts from "../hooks/useAccounts";
import  Messages  from "../components/Messages";
import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { TransactionContext } from "../context/TransactionContext";

function Accounts() {

  const { addAccount, deleteAccount, handleInputChange, updateAccount } = useAccounts();
  const { accounts, editAccount, setEditAccount } = useContext(AccountContext);
  const { inputs, setIsModalOpen, isModalOpen } = useContext(TransactionContext);


  return (
    <>
      <Messages />

      <div className="flex flex-col justify-start items-center p-4 gap-2 h-full w-full mb-20">
        <h1 className="text-3xl">Рахунки</h1>
        
        <button
          className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Додати рахунок
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl">Додати рахунок</h2>
          <input
            className="p-2 border"
            type="text"
            name="accountName"
            value={inputs.accountName}
            placeholder="Назва рахунку"
            onChange={handleInputChange}
          />
          <button
            className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
            onClick={() => {
              addAccount(inputs.accountName);
            }}
          >
            Додати
          </button>
          </Modal>
        <div className="flex flex-col p-2 gap-2">
          {accounts.length >= 0 && (
            <div>
              <p>Всього рахунків: {accounts.length}</p>
            </div>
          )}
          {accounts.map((account) => (
            <div key={account.id} className="flex flex-col justify-between items-center p-2 border rounded">
              <h1>{account.name}</h1>
              <p>Баланс: {account.balance} грн</p>
              <p>Ліміт: {account.limited ? account.limit : "Немає"}</p>
              <p>Створено: {new Date(account.id).toLocaleDateString()}</p>
              <p>ID: {account.id}</p>
              <div className="flex gap-2">
                <button
                  className="border px-2 py-1 rounded hover:bg-gray-200 hover:shadow-lg"
                  onClick={() => setEditAccount(account.id)}
                >
                  Редагувати
                </button>
                <button
                  className="border px-2 py-1 rounded hover:bg-gray-200 hover:shadow-lg"
                  onClick={() => deleteAccount(accounts.indexOf(account))}
                >
                  Видалити
                </button>

              </div>
              <Modal
                isOpen={editAccount === account.id}
                onClose={() => setEditAccount(null)}
                account={account}
                key={account.id}
              >
                <h2 className="text-xl">Редагувати {account.name}</h2>
                <input
                  className="p-2 border"
                  type="text"
                  name="updateName"
                  value={inputs.updateName}
                  placeholder="Назва рахунку"
                  onChange={handleInputChange}
                />
                <input
                  className="p-2 border"
                  type="number"
                  name="balance"
                  value={inputs.balance}
                  placeholder="Баланс"
                  onChange={handleInputChange}
                />
                <input
                  className="p-2 border"
                  type="number"
                  name="limit"
                  value={inputs.limit}
                  placeholder="Ліміт"
                  onChange={handleInputChange}
                />

                <button
                  className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg"
                  onClick={() => {
                    updateAccount(account.id);
                    setEditAccount(null);
                  }}
                >
                  Зберегти
                </button>
              </Modal>
            </div>

          ))}
          {accounts.length === 0 && <p>Немає рахунків</p>}
        </div>
      </div>
      <NavBar />

    </>
  );
}
export default Accounts;