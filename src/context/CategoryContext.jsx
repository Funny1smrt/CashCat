import { useState } from "react";
import { CategoryContext } from "./CategoryContext";
import useLocalStorage from "../hooks/useLocalStorage";
function CategoryProvider({ children }) {

    const [categories, setCategories] = useLocalStorage("categories", []);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);


    return <CategoryContext.Provider value={{ categories, setCategories, isCategoryModalOpen, setIsCategoryModalOpen }}>{children}</CategoryContext.Provider>;
}

export default CategoryProvider;