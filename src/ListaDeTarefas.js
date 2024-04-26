import React, { useState, useEffect } from 'react';
import './ListaDeTarefas.css';

function ListaDeTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasArmazenadas) {
      setTarefas(tarefasArmazenadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
      setMostrarFormulario(false);
    }
  };

  const removerTarefa = (index) => {
    const novaLista = [...tarefas];
    novaLista.splice(index, 1);
    setTarefas(novaLista);
  };

  return (
    <div className="lista-de-tarefas">
      <h1>Tarefas Etec</h1>  
      {mostrarFormulario && (
        <div className="adicionar-tarefa">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma nova tarefa"
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>
      )}
      {!mostrarFormulario && (
        <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
      )}
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} className="tarefa">
            <div>{tarefa}</div>
            <div className="remover-tarefa" onClick={() => removerTarefa(index)}>Deslize para excluir</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTarefas;