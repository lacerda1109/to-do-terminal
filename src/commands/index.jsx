export function emptyCommand(username) {
    return (
        <p id="username">
            {username}: <span>~$</span>
        </p>
    );
}

export function errorCommand(username, codeInput) {
    let command = codeInput.split(" ")[0];
    if (command !== "tdt") {
        let commandLine = (
            <p id="username">
                {username}: <span style={{ marginRight: "8px" }}>~$</span>{" "}
                {codeInput}
            </p>
        );
        let errorMsg = (
            <p>
                "{command}" não é reconhecido como um comando interno. Tente
                'tdt'.
            </p>
        );
        return {commandLine, errorMsg}
    }
}
