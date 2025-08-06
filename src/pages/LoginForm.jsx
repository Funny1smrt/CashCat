import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,

} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useContext } from "react";
import { NavigationContext } from "../context/NavigationContext";
// import 'firebase/firestore';

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { goToTest } = useContext(NavigationContext);

    function createUser(auth, email, password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/auth.user
                    const uid = user.uid;
                    console.log(uid);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);
            });
        setEmail("");
        setPassword("");
    }
    function signIn(auth, email, password) {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user) {
                    console.log(user);
                    const uid = user.uid;
                    console.log(uid);
                    goToTest();
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode);
            });
        setEmail("");
        setPassword("");

    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("User is signed in");
            console.log(uid);
            // goToHome();
        } else {
            // User is signed out
            return <p>Ви не авторизовані</p>

        }
    });

    return (
        <>
            <div className="flex flex-col gap-2 ">
                <h1 className="text-3xl">Зареєструватися</h1>

                <div className="flex flex-col ">
                    <label htmlFor="email">Пошта</label>
                    <input className="p-2 border" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="password">Пароль</label>
                    <input className="p-2 border" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg" type="submit" onClick={() => createUser(auth, email, password)}>Зареєструватися</button>
                <button className="border px-4 py-2 rounded hover:bg-gray-200 hover:shadow-lg" type="submit" onClick={() => signIn(auth, email, password)}>Увійти</button>
            </div>
            
        </>
    )

}
export default LoginForm;