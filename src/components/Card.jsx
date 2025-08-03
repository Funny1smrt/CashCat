
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";
import { useContext } from "react";
import TransactionModal from "./TransactionModal";

function Card() {
    const navigate = useNavigate();

    const { activeAccount } = useContext(AccountContext);
    function goToTransactions() {
        navigate("/transactions");
    }

    return (
        <div className="flex flex-col justify-center gap-2"
        >
                    <div
                        className="flex flex-col justify-center items-center gap-2 w-50 h-40 border rounded-xl"
                        onClick={goToTransactions}
                    >
                        <p>{activeAccount.name}</p>
                        <p>Баланс: {activeAccount.balance} грн.</p>

            </div>
            <TransactionModal />
        </div>
    );
}

export default Card;