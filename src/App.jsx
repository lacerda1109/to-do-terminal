import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { emptyCommand, errorCommand, tdtCommandsCheck } from "./commands/index";

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

    // INICIALIZAÇÕES DO APP ----------------------------------------------------------------------
    const terminal = useRef();
    const codeInputRef = useRef();
    useEffect(() => {
        let todos = localStorage.getItem("todos");
        if (!todos) {
            localStorage.setItem(
                "todos",
                JSON.stringify({ totalCount: 0, todos: [] })
            );
        }
        codeInputRef.current.focus();
    }, []);

    // TROCA DE USERNAME --------------------------------------------------------------------------
    const [username, setUsername] = useState("Guest");
    useEffect(() => {
        let savedUsername = localStorage.getItem("username");
        if (savedUsername === null) {
            setUsername("Guest");
        } else {
            setUsername(savedUsername);
        }
    }, []);

    function changeUsername(e) {
        if (e.keyCode === 13) {
            setUsername(nameInput);
            localStorage.setItem("username", nameInput);
            setNameInput("");
            setArrDisplay([]);
            codeInputRef.current.focus();
        }
    }

    // LÓGICA RESPOSTA DE COMANDOS ----------------------------------------------------------------
    const [arrDisplay, setArrDisplay] = useState([]);
    const [arrCommands, setArrCommands] = useState([]);
    const [commandIndex, setCommandIndex] = useState(null);
    function exec(e) {
        // EXECUÇÃO DE FUNÇÕES COM O EVENTO DO ENTER NO TERMINAL
        if (e.keyCode === 13) {
            if (codeInput === "") {
                let empty = emptyCommand(username);
                setArrDisplay([...arrDisplay, empty]);
            } else {
                setArrCommands([...arrCommands, codeInput]);
                setCommandIndex(null);
                let command = codeInput.split(" ")[0];
                if (command !== "tdt") {
                    let ret = errorCommand(username, codeInput);
                    setArrDisplay([
                        ...arrDisplay,
                        ret.commandLine,
                        ret.errorMsg,
                    ]);
                    setCodeInput("");
                } else if (command === "tdt") {
                    let ret = tdtCommandsCheck(username, codeInput);
                    setArrDisplay([
                        ...arrDisplay,
                        ret.commandLine,
                        ret.returnMsg,
                    ]);
                    setCodeInput("");
                }
            }

            // Scroll para o fim do terminal
            setInterval(() => {
                let terminalHeight = terminal.current.scrollHeight
                terminal.current.scrollTo(0, terminalHeight)
            }, 50)
        }

        // LIMPEZA DO DISPLAY DO TERMINAL AO PRESSIONAR CTRL + M
        if (e.keyCode === 77 && e.ctrlKey) {
            setArrDisplay([]);
        }

        // FUNÇÕES DE USAR ÚLTIMOS CÓDIGOS DIGITADOS COM AS SETAS DO TECLADO
        if (e.keyCode === 38) {
            if (commandIndex === 0) {
                return;
            }
            if (commandIndex === null) {
                setCommandIndex(arrCommands.length - 1);
            } else {
                setCommandIndex(commandIndex - 1);
            }
        }

        if (e.keyCode === 40) {
            if (commandIndex === null) {
                return;
            }
            if (commandIndex === arrCommands.length - 1) {
                setCommandIndex(null);
                setCodeInput("");
                return;
            }
            setCommandIndex(commandIndex + 1);
        }
    }

    // Altera o texto do terminal para códigos escritos anteriormente
    useEffect(() => {
        if (commandIndex !== null) {
            setCodeInput(arrCommands[commandIndex]);
        }
    }, [commandIndex]);

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
                        spellCheck="false"
                        value={nameInput}
                        onChange={handleNameInput}
                        onKeyUp={(e) => changeUsername(e)}
                    />
                </div>
            </header>
            <main>
                <div className="terminal" ref={terminal}>
                    {arrDisplay.map((el, i) => {
                        return <div key={i}>{el}</div>;
                    })}
                    <div className="commandLine">
                        <p id="username">
                            {username}: <span>~$</span>
                        </p>
                        <input
                            ref={codeInputRef}
                            type="text"
                            spellCheck="false"
                            value={codeInput}
                            onChange={handleCodeInput}
                            onKeyUp={(e) => exec(e)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
