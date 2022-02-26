import { about, help, add, remove, notTdtCommand, mark, unmark } from "./commands";

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
        case undefined:
            returnMsg = help();
            break;
        case "":
            returnMsg = help();
            break;
        case "about":
            returnMsg = about();
            break;
        case "help":
            returnMsg = help();
            break;
        case "add":
            returnMsg = add(codeInput);
            break;
        case "remove":
            returnMsg = remove(codeInput);
            break;
        case "mark":
            returnMsg = mark(codeInput);
            break;
        case "unmark":
            returnMsg = unmark(codeInput);
            break;
        default:
            returnMsg = notTdtCommand(command);
    }

    return { commandLine, returnMsg };
}
