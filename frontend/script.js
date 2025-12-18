const API_URL = "http://localhost:8080/tarefas";

document.getElementById("form-tarefa").addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descricao })
    });

    carregarTarefas();
});

async function carregarTarefas() {
    const response = await fetch(API_URL);
    const tarefas = await response.json();

    const lista = document.getElementById("lista-tarefas");
    lista.innerHTML = "";

    tarefas.forEach(t => {
        const li = document.createElement("li");
        li.innerText = `${t.titulo} - ${t.descricao}`;
        lista.appendChild(li);
    });
}

carregarTarefas();
