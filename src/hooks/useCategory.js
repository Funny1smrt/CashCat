import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { CategoryContext } from "../context/CategoryContext";

function useCategory() {
    const { categories, setCategories } = useContext(CategoryContext);
    const { inputs, setInputs } = useContext(TransactionContext);
      function addCategory() {
        if (!inputs.category || categories.includes(inputs.category)) return;
        setCategories((prev) => [...prev, inputs.category]);
        setInputs((prev) => ({ ...prev, category: "" }));
      }
    
      function removeCategory(category) {
        setCategories((prev) => prev.filter((cat) => cat !== category));
      }

      return { addCategory, removeCategory };
}

export default useCategory;