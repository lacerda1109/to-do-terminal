import React from "react";
import "./App.css";

function App() {
    return (
        <div className="App">
            <header>
                <div className="headerContent">
                    <p className="appLogo">
                        <span>$</span>ToDoTerminal
                    </p>
                    <input type="text" placeholder="Insira seu nome" />
                </div>
            </header>
            <main>
                <div className="terminal">
                    <div className="commandLine">
                        <p>
                            Gabriel: <span>~$</span>
                        </p>
                        <input type="text" spellCheck="false" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
