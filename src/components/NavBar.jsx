import { Link } from "react-router-dom";
import { NavigationContext } from "../context/NavigationContext";
import { useContext } from "react";
function NavBar() {
    const { goBack, page } = useContext(NavigationContext);

    return (
        <>
            {page !== "/" && page !== "/settings" &&
                <button className="border p-2 rounded-full m-2 fixed top-0 left-0" onClick={goBack}>Назад</button>
            }

            <div className="flex justify-between items-center gap-4 fixed bottom-0 p-4 border-t bg-white overflow-x-auto w-full z-50 text-xs">
                <Link to="/" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                    Головна
                </Link>
                <Link to="/planes" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                    Плани
                </Link>
                <Link to="/settings" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                    Налаштування
                </Link>
                <Link to="/login" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                    Вхід
                </Link>

            </div>
        </>
    );
}
export default NavBar;