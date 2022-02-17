import React, { useState } from "react";
import "./App.css";

function App() {
    const [nameInput, setNameInput] = useState("");
    function handleNameInput(e) {
        setNameInput(e.target.value);
    }
    const [codeInput, setCodeInput] = useState("");
    function handleCodeInput(e) {
        setCodeInput(e.target.value);
    }

    return (
        <div className="App">
            <header>
                <div className="headerContent">
                    <p className="appLogo">
                        <span>$</span>ToDoTerminal
                    </p>
                    <input
                        type="text"
                        placeholder="Insira seu nome"
                        value={nameInput}
                        onChange={handleNameInput}
                    />
                </div>
            </header>
            <main>
                <div className="terminal">
                    <div className="commandLine">
                        <p>
                            Gabriel: <span>~$</span>
                        </p>
                        <input
                            type="text"
                            spellCheck="false"
                            value={codeInput}
                            onChange={handleCodeInput}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
