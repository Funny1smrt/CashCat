import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

/**
 * Хук для збереження/отримання даних користувача з Firestore
 * @param {string} key - назва колекції
 * @param {*} initialValue - початкове значення
 */
function useFirebaseStorage(key, initialValue) {
  const user = useAuth();
  const uid = user?.uid;
  const [value, setValue] = useState(initialValue);

  // Завантажити дані з Firestore при першому завантаженні
  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return console.log("No uid");

      try {
        const docRef = doc(db, key, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setValue(docSnap.data());
        } else {
          setValue(initialValue);
        }
      } catch (error) {
        console.error("Error loading document:", error);
        setValue(initialValue);
      }
    };

    fetchData();
  }, [key, uid]);

  // Зберігати дані у Firestore при зміні value
  useEffect(() => {
    const saveData = async () => {
      if (!uid) return;

      try {
        const docRef = doc(db, key, uid);
        if (typeof value !== "object" || value === null) {
          console.warn("Invalid data:", value);
          return;
        }

        await setDoc(docRef, value);
        console.log("Document successfully written.");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    };

    saveData();
  }, [key, uid, value]);

  return [value, setValue];
}

export default useFirebaseStorage;
