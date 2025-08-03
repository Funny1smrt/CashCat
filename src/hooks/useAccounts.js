import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { TransactionContext } from "../context/TransactionContext";
import useMassage from "./useMassage";
function useAccounts() {
  const { accounts, setAccounts } = useContext(AccountContext);
  const { inputs, setInputs, setIsModalOpen } = useContext(TransactionContext);
  const { showWarning, showSuccess } = useMassage();

  function addAccount() {
    if (!inputs.accountName || inputs.accountName.trim() === "") {
      showWarning("Введіть назву акаунту!");
      return;
    }

    // Check if the account already exists
    if (accounts.some((account) => account.name === inputs.accountName)) {
      showWarning("Акаунт з такою назвою вже існує!");
      return;
    }
    setAccounts([
      ...accounts,
      {
        id: Date.now(), // Generate a random ID
        name: inputs.accountName,
        balance: 0, // Default balance
        limited: false, // Default value for 'limited'
        limit: 0, // Default value for 'limit'
      },
    ]);
    showSuccess("Акаунт успішно доданий!");
    setInputs((prev) => ({ ...prev, accountName: "" })); // Reset input field
    setIsModalOpen(false);
  }
  function deleteAccount(index) {
    if (index === -1) {
      console.warn("Акаунт не знайдено.");
      return;
    }
    setAccounts([...accounts.slice(0, index), ...accounts.slice(index + 1)]);
    showSuccess("Акаунт успішно видалениий!");
  }
  function updateAccount(id) {
    const accountIndex = accounts.findIndex((account) => account.id === id);
    let checkedName;
    let checkedLimit;
    let checkedBalance;
    if (accountIndex === -1) {
      console.warn("Account not found for update.");
      return;
    }
    const updatedAccounts = [...accounts];
    if (inputs.updateName.trim() === "") {
      checkedName = updatedAccounts[accountIndex].name; // Keep the old name if new is empty
    } else {
      checkedName = inputs.updateName; // Use the new name if provided
    }
    if (isNaN(Number(inputs.limit)) || Number(inputs.limit) < 0) {
      checkedLimit = 0; // Default to 0 if limit is invalid
    } else {
      checkedLimit = Number(inputs.limit); // Use the new limit if provided
    }
    if (isNaN(Number(inputs.balance)) || Number(inputs.balance) < 0) {
      checkedBalance = updatedAccounts[accountIndex].balance; // Keep the old balance if new is invalid
    } else {
      checkedBalance = Number(inputs.balance); // Use the new balance if provided
    }

    updatedAccounts[accountIndex].name = checkedName;
    updatedAccounts[accountIndex].balance = checkedBalance;
    updatedAccounts[accountIndex].limited = checkedLimit > 0; // Set limited based on limit value
    updatedAccounts[accountIndex].limit = checkedLimit;
    setAccounts(updatedAccounts);
    setInputs((prev) => ({ ...prev, updateName: "", balance: "", limit: "" })); // Reset input field
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return {
    addAccount,
    deleteAccount,
    handleInputChange,
    updateAccount,
  };
}
export default useAccounts;
