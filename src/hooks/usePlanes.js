import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AccountContext } from "../context/AccountContext";
import useTransaction from "./useTransaction";

function usePlanes() {

  const { accounts } = useContext(AccountContext);
  const { categories } = useContext(TransactionContext);
  const { inputs, setInputs, setIsSpendModalOpen, setIsIncomeModalOpen } =
    useContext(TransactionContext);
  const { planes, setPlanes } = useContext(TransactionContext);

  const { transaction } = useTransaction();

  function planeSpendMoney() {
    const account = accounts.find((acc) => acc.name === inputs.account);
    const category = categories.find((cat) => cat === inputs.category);

    if (!account) {
      console.warn("Account not found.");
      return;
    }

    if (isNaN(Number(inputs.spend)) || Number(inputs.spend) <= 0) return;
    transaction("spend", inputs.spend, category, account, new Date(inputs.date), inputs.isPeriod);

    setInputs((prev) => ({
      ...prev,
      spend: "",
      date: "",
      category: "",
      isPeriod: false,
      account: "",
    }));
    setIsSpendModalOpen(false);
  }
  function planeIncomeMoney() {
    const account = accounts.find((acc) => acc.name === inputs.account);
    const category = categories.find((cat) => cat === inputs.category);

    if (!account) {
      console.warn("Account not found.");
      return;
    }
    if (isNaN(Number(inputs.income)) || Number(inputs.income) <= 0) return;
    transaction("income", inputs.income, category, account, new Date(inputs.date), inputs.isPeriod);

    setInputs((prev) => ({
      ...prev,
      income: "",
      date: "",
      category: "",
      isPeriod: false,
      account: "",
    }));
    setIsIncomeModalOpen(false);
  }

  return {
    planes,
    setPlanes,
    planeSpendMoney,
    planeIncomeMoney,
  };
}

export default usePlanes;
