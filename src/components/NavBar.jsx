import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="flex justify-between items-center gap-4 fixed bottom-0 p-4 border-t bg-white overflow-x-auto w-full z-50">
            <Link to="/" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                Головна
            </Link>
            <Link to="/transactions" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                Транзакції
            </Link>
            <Link to="/planes" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                Плани
            </Link>
            <Link to="/settings" className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg">
                Налаштування
            </Link>
            
        </div>
    );
}
export default NavBar;