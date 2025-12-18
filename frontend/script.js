const API_URL = "http://localhost:8080/tarefas";

// GET - listar tarefas
async function listarTarefas() {
    const resposta = await fetch(API_URL);
    const tarefas = await resposta.json();
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${tarefa.titulo}</strong> - ${tarefa.descricao} 
            [${tarefa.concluida ? "Concluída" : "Pendente"}]
        `;

        // Botão Atualizar
        const btnAtualizar = document.createElement("button");
        btnAtualizar.textContent = "Atualizar";
        btnAtualizar.onclick = () => atualizarTarefa(tarefa);

        // Botão Deletar
        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "Deletar";
        btnDeletar.onclick = () => deletarTarefa(tarefa.id);

        li.appendChild(btnAtualizar);
        li.appendChild(btnDeletar);
        lista.appendChild(li);
    });
}

// POST - criar tarefa
async function criarTarefa() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const concluidas = document.getElementById("concluida").checked;

    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao, concluida: concluidas })
    });

    if (resposta.ok) {
        document.getElementById("titulo").value = "";
        document.getElementById("descricao").value = "";
        document.getElementById("concluida").checked = false;
        listarTarefas();
    }
}

// PUT - atualizar tarefa
async function atualizarTarefa(tarefa) {
    const novoTitulo = prompt("Novo título:", tarefa.titulo);
    const novaDescricao = prompt("Nova descrição:", tarefa.descricao);
    const novaConcluida = confirm("Marcar como concluída?"); // true ou false

    const resposta = await fetch(`${API_URL}/${tarefa.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            titulo: novoTitulo,
            descricao: novaDescricao,
            concluida: novaConcluida
        })
    });

    if (resposta.ok) {
        listarTarefas();
    }
}

// DELETE - remover tarefa
async function deletarTarefa(id) {
    const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (resposta.ok) {
        listarTarefas();
    }
}

// Inicializa lista
listarTarefas();
