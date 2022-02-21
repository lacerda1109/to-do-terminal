import "./commands.css";

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
        let todos = JSON.parse(localStorage.getItem("todos"));

        if (todos) {
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
                A tarefa <span className="green">{toDoName}</span> foi
                adicionada com o ID <span className="green">{createdID}</span>.
            </p>
        );
    } else {
        return <p>Você deve adicionar um nome à sua tarefa.</p>;
    }
};
