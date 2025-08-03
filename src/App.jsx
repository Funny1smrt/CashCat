import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx"; // Assuming you have a Transactions component
import Settings from "./pages/Settings.jsx";
import Accounts from "./pages/Accounts.jsx"; // Assuming you have an Accounts component
import Planes from "./pages/Planes.jsx";
import MessageProvider from "./context/MessageContext.jsx";
import TransactionProvider from "./context/TransactionContext.jsx";
import AccountProvider from "./context/AccountContext.jsx";
import CategoryProvider from "./context/CategoryContext.jsx";
function App() {
  return (
    <MessageProvider>
      <CategoryProvider>
        <TransactionProvider>
          <AccountProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/planes" element={<Planes />} />
              {/* Add more routes as needed */}
            </Routes>
          </AccountProvider>
        </TransactionProvider>
      </CategoryProvider>
    </MessageProvider>

  );
}

export default App;
