import { about } from "./commands";

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
                '{command}' não é reconhecido como um comando interno. Tente
                'tdt'.
            </p>
        );
        return { commandLine, errorMsg };
    }
}

export function tdtCommandsCheck(username, codeInput) {
    let commandLine = (
        <p id="username">
            {username}: <span style={{ marginRight: "8px" }}>~$</span>{" "}
            {codeInput}
        </p>
    );
    let returnMsg;

    let command = codeInput.split(" ")[1];
    switch (command) {
        case "about":
            returnMsg = about();
            break;
        default:
            returnMsg = (
                <p>'{command}' não é um comando tdt. Veja 'tdt help'.</p>
            );
    }

    return { commandLine, returnMsg };
}
