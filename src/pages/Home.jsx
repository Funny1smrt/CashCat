import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { TransactionContext } from "../context/TransactionContext";
import { AccountContext } from "../context/AccountContext";
import { useContext } from "react";
import Messages from "../components/Messages";
function Home() {
    const { money } = useContext(TransactionContext);
    const { accounts, position, setPosition } = useContext(AccountContext);
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-2 h-full w-full mb-20">

                <h1 className="text-3xl sticky top-0">Всього грошей: {money} грн.</h1>
                <div className="flex flex-row justify-center items-center gap-2 overflow-x-scroll w-full">
                    {accounts.length === 0 && <p>Немає акаунтів</p>}
                    {accounts.length > 0 &&
                        <div
                            className="flex flex-row justify-center items-center gap-2">
                            <button className="border p-2" onClick={() => position > 0 && setPosition(position - 1)}><p>Назад</p></button>

                            <Card />
                            <button className="border p-2" onClick={() => position < accounts.length - 1 && setPosition(position + 1)}><p>Вперед</p></button>
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
