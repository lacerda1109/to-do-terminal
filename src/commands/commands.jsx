import "./commands.css";

export const notTdtCommand = (command) => (
    <p>'{command}' não é um comando tdt. Tente 'tdt help'.</p>
);

export const about = () => (
    <div className="messageSpace">
        <p>
            Me chamo Gabriel, e desenvolvi esta aplicação para treinar meus
            conhecimentos em programação. O objetivo do app é manipular uma
            lista de tarefas em forma de terminal, onde são necessários comandos
            para adicionar, remover, listar as tarefas, entre outros.
        </p>
        <br />
        <p>
            Para este fim, foi utilizado ReactJS, e os dados são salvos
            diretamente no navegador, no local storage (no caso de limpeza do
            mesmo, seus dados serão perdidos). Por se tratar de um simples
            projeto front-end, não foi implementada integração com banco de
            dados.
        </p>
        <br />
        <p>
            Repo:{" "}
            <a
                href="https://github.com/lacerda1109/to-do-terminal"
                target="_blank"
            >
                https://github.com/lacerda1109/to-do-terminal
            </a>
        </p>
        <p>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/lacerda1109/" target="_blank">
                https://www.linkedin.com/in/lacerda1109/
            </a>
        </p>
        <br />
        <p>Para mais comandos digite: 'tdt help'.</p>
    </div>
);

export const help = () => (
    <div className="messageSpace">
        <p>Uso: tdt &lt;comando&gt; [&lt;argumento&gt;]</p>
        <br />
        <p className="helpTitle">
            Estes são os comandos que podem ser utilizados para esta aplicação:
        </p>
        <table className="helpTable">
            <tbody>
                <tr className="helpRow">
                    <td>help</td>
                    <td>Mostra esta mensagem de ajuda.</td>
                </tr>
                <tr className="helpRow">
                    <td>add ["nome"]</td>
                    <td>
                        Adiciona uma tarefa, passando o nome entre aspas como
                        argumento.
                    </td>
                </tr>
                <tr className="helpRow">
                    <td>remove [id]</td>
                    <td>
                        Remove uma tarefa. É necessário passar como argumento o
                        id da tarefa.
                    </td>
                </tr>
                <tr className="helpRow">
                    <td>list</td>
                    <td>Lista as tarefas existentes e seus estados.</td>
                </tr>
                <tr className="helpRow">
                    <td>mark [id]</td>
                    <td>Marca uma tarefa como concluída.</td>
                </tr>
                <tr className="helpRow">
                    <td>unmark [id]</td>
                    <td>Desmarca uma tarefa como concluída.</td>
                </tr>
                <tr className="helpRow">
                    <td>about</td>
                    <td>Mostra um texto falando sobre o projeto.</td>
                </tr>
                <tr className="helpRow">
                    <td>wipe</td>
                    <td>
                        Remove automaticamente todas as tarefas marcadas como
                        concluídas.
                    </td>
                </tr>
            </tbody>
        </table>
        <br />
        <p className="helpTitle">Estes são os atalhos de teclado:</p>
        <table className="helpTable">
            <tr className="helpRow">
                <td>ctrl + m</td>
                <td>Limpa o terminal.</td>
            </tr>
        </table>
    </div>
);

function validateToDos() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
        localStorage.setItem(
            "todos",
            JSON.stringify({ totalCount: 0, todos: [] })
        );
    }
    return todos;
}

function validateName(value) {
    if (
        value !== "" &&
        value !== '""' &&
        value !== '"' &&
        value !== "''" &&
        value !== "'"
    )
        return true;
    else return false;
}

export const add = (codeInput) => {
    let toDoName = codeInput.split(" ").slice(2).join(" ");
    let createdID;
    if (validateName(toDoName)) {
        validateToDos();
        let todos = JSON.parse(localStorage.getItem("todos"));

        if (todos.todos.length !== 0) {
            let newId = todos.todos[todos.todos.length - 1].id;
            localStorage.setItem(
                "todos",
                JSON.stringify({
                    totalCount: todos.todos.length + 1,
                    todos: [
                        ...todos.todos,
                        { id: newId + 1, name: toDoName, status: false },
                    ],
                })
            );
            createdID = newId + 1;
        } else {
            localStorage.setItem(
                "todos",
                JSON.stringify({
                    totalCount: 1,
                    todos: [{ id: 1, name: toDoName, status: false }],
                })
            );
            createdID = 1;
        }

        return (
            <p>
                A tarefa <span className="green">"{toDoName}"</span> foi
                adicionada com o ID <span className="green">{createdID}</span>.
            </p>
        );
    } else {
        return <p>Você deve adicionar um nome à sua tarefa.</p>;
    }
};

export const remove = (codeInput) => {
    let commandLength = codeInput.split(" ").length;
    let providedId = codeInput.split(" ")[2];
    if (commandLength > 3) {
        return <p>O ID passado é inválido.</p>;
    } else if (providedId === undefined || providedId === "") {
        // Se o ID não for passado ou for equivalente a uma string vazia:
        return <p>Você deve passar um ID.</p>;
    } else {
        // Verifica se o ID existe
        let todos = JSON.parse(localStorage.getItem("todos"));
        let toDoIndex = todos.todos.findIndex(
            (el) => el.id === Number(providedId)
        ); // Índex da tarefa com o ID correspondente
        if (toDoIndex !== -1) {
            // ID passado existe
            let toDoName = todos.todos[toDoIndex].name
            todos.todos.splice(toDoIndex, 1) // Remove tarefa e atualiza o localStorage abaixo
            localStorage.setItem("todos", JSON.stringify({
                totalCount: todos.todos.length,
                todos: todos.todos
            }));
            return (
                <p>
                    A tarefa{" "}
                    <span className="green">
                        "{toDoName}"
                    </span>{" "}
                    de ID <span className="green">{providedId}</span> foi
                    removida.
                </p>
            );
        } else {
            // ID passado nao existe
            return (
                <p>
                    O ID <span className="green">"{providedId}"</span> não
                    existe. Digite 'tdt list' para conferir as tarefas
                    existentes.
                </p>
            );
        }
    }
};
