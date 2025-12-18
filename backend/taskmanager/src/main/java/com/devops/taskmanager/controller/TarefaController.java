package com.devops.taskmanager.controller;

import com.devops.taskmanager.model.Tarefa;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tarefas")
public class TarefaController {

    private List<Tarefa> tarefas = new ArrayList<>();

    @GetMapping
    public List<Tarefa> listarTarefas() {
        return tarefas;
    }

    @PostMapping
    public Tarefa criarTarefa(Tarefa tarefa) {
        tarefa.setId((long) (tarefas.size() + 1));
        tarefas.add(tarefa);
        return tarefa;
    }
}
