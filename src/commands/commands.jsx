export const about = () => (
    <>
        <p>
            Me chamo Gabriel, e desenvolvi esta aplicação para treinar meus
            conhecimentos no campo da programação. O objetivo do app é manipular
            uma lista de tarefas em forma de terminal, onde são necessários
            comandos para adicionar, remover, listar as tarefas, entre outros.
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
    </>
);
