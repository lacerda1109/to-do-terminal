import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    // ESTADOS DOS INPUTS -------------------------------------------------------------------------
    const [nameInput, setNameInput] = useState("");
    function handleNameInput(e) {
        setNameInput(e.target.value);
    }
    const [codeInput, setCodeInput] = useState("");
    function handleCodeInput(e) {
        setCodeInput(e.target.value);
    }

    // REFERÊNCIA PARA INPUT DO TERMINAL ----------------------------------------------------------
    const codeInputRef = useRef();
    useEffect(() => {
        codeInputRef.current.focus();
    }, []);
    
    // TROCA DE USERNAME --------------------------------------------------------------------------
    const [username, setUsername] = useState("Guest");
    useEffect(() => {
        let savedUsername = localStorage.getItem("username")
        if (savedUsername === null) {
            setUsername("Guest")
        } else {
            setUsername(savedUsername)
        }
    }, [])

    function changeUsername(e) {
        if (e.keyCode === 13) {
            setUsername(nameInput);
            localStorage.setItem("username", nameInput)
            setNameInput("");
            codeInputRef.current.focus();
        }
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
                        onKeyUp={(e) => changeUsername(e)}
                    />
                </div>
            </header>
            <main>
                <div
                    className="terminal"
                    onClick={() => codeInputRef.current.focus()}
                >
                    <div className="commandLine">
                        <p>
                            {username}: <span>~$</span>
                        </p>
                        <input
                            ref={codeInputRef}
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
