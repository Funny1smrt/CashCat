import useFirebaseStorage from "../hooks/useFirebase";
import { useState } from "react";
function TestPage() {
    const [test, setTest] = useFirebaseStorage("test", {
        input: "test"
    });
    const [input, setInput] = useState("");
    return (
        <div>
            <h1>TestPage</h1>
            <h1>{test.input}</h1>
            <input className="p-2 border" type="text" onChange={(e) => setInput(e.target.value)} />
            <button className="border p-2" onClick={() => setTest({ input: input })}>test</button>
        </div>
    );

}

export default TestPage;