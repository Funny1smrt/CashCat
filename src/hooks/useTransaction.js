import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import { TransactionContext } from "../context/TransactionContext";
import useMassage from "./useMassage";
import { CategoryContext } from "../context/CategoryContext";
function useTransaction() {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const { setMoney } = useContext(TransactionContext);
  const { inputs, setInputs } = useContext(TransactionContext);
  const { setIsModalOpen } = useContext(TransactionContext);
  const { setIsSpendModalOpen } = useContext(TransactionContext);
  const { setIsIncomeModalOpen } = useContext(TransactionContext);
  const { setCategories } = useContext(CategoryContext);
  const { activeAccount } = useContext(AccountContext);
  const { accounts, setAccounts } = useContext(AccountContext);
  const { showWarning } = useMassage();

  // useEffect(() => {
  //   let allMoney = 0;
  //   accounts.forEach((account) => {
  //     allMoney += Number(account.balance);
  //   });
  //   setMoney(allMoney);
  // }, [accounts, setMoney]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function transaction(type, amount, account, date, period) {
    if (isNaN(Number(amount)) || Number(amount) <= 0) return;
    setTransactions([
      ...transactions,
      {
        id: Date.now(), // Generate a random ID
        type: type,
        account: account.name,
        category: inputs.category ? inputs.category : "Інше", // Default category, can be changed later
        period: period,
        amount: Number(amount),
        allMoney: account.balance,
        afterMoney:
          Number(amount) > 0
            ? account.balance + Number(amount)
            : account.balance - Number(amount),

        date: {
          hour: date.getHours(),
          minute:
            date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes(),
          day: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
          month:
            date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1,
          year: date.getFullYear(),
        },
      },
    ]);
    setAccounts(
      accounts.map((acc) => {
        if (acc.name === account.name) {
          return {
            ...acc,
            balance:
              type === "spend"
                ? acc.balance - Number(amount)
                : acc.balance + Number(amount),
          };
        }
        return acc;
      })
    );
  }
  function reverseTransaction(id) {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) {
      console.warn("Transaction not found for reversal.");
      return;
    }
    // Remove the transaction from the list

    if (transaction.type === "spend") {
      setAccounts(
        accounts.map((acc) => {
          if (acc.name === transaction.account) {
            return {
              ...acc,
              balance: acc.balance + Number(transaction.amount),
            };
          }
          return acc;
        })
      );
    } else if (transaction.type === "income") {
      setAccounts(
        accounts.map((acc) => {
          if (acc.name === transaction.account) {
            return {
              ...acc,
              balance: acc.balance - Number(transaction.amount),
            };
          }
          return acc;
        })
      );
    }
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  function spendMoney() {
    if (!activeAccount) {
      showWarning("Акаунт не знайдено!");
      return;
    }
    if (isNaN(Number(inputs.spend)) || Number(inputs.spend) <= 0) return;
    transaction("spend", inputs.spend, activeAccount, new Date(), false);

    setInputs((prev) => ({
      ...prev,
      spend: "",
      category: "",
      isPeriod: false,
    }));
    setIsSpendModalOpen(false);
    console.log(transactions[transactions.length - 1]);
  }

  function incomeMoney() {
    if (!activeAccount) {
      showWarning("Акаунт не знайдено!");
      return;
    }
    if (isNaN(Number(inputs.income)) || Number(inputs.income) <= 0) return;
    transaction("income", inputs.income, activeAccount, new Date(), false);
    setInputs((prev) => ({
      ...prev,
      income: "",
      category: "",
      isPeriod: false,
    }));
    setIsIncomeModalOpen(false);
    console.log(transactions[transactions.length - 1]);
  }

  function resetAll() {
    setMoney(0);
    setTransactions([]);
    setCategories([]);
    setInputs({
      spend: "",
      category: "",
      income: "",
      account: "",
      date: "",
    });
    setAccounts([]);
    localStorage.removeItem("accounts");
    localStorage.removeItem("money");
    localStorage.removeItem("transactions");
    localStorage.removeItem("categories");
    localStorage.removeItem("planes");
    setIsModalOpen(false);
  }


  return {
    handleInputChange,
    spendMoney,
    incomeMoney,
    transaction,
    reverseTransaction,
    resetAll,
  };
}

export default useTransaction;
