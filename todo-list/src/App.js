import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [atividades, setAtividades] = useState([]);
  const [novaAtividade, setNovaAtividade] = useState('');
//adicionar uma ativiade
  const adicionarAtividade = () => {
    if (novaAtividade.trim() !== '') {
      setAtividades([...atividades, { nome: novaAtividade, finalizado: false }]);
      setNovaAtividade('');
    }
  };
//excluir atividade
  const excluirAtividade = (index) => {
    const novaLista = atividades.filter((_, i) => i !== index);
    setAtividades(novaLista);
  };
//Marcar concluído
  const marcarConcluido = (index) => {
    const novaLista = atividades.map((atividade, i) =>
      i === index ? { ...atividade, finalizado: !atividade.finalizado } : atividade
    );
    setAtividades(novaLista);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">React To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Informe uma atividade..."
          value={novaAtividade}
          onChange={(e) => setNovaAtividade(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && adicionarAtividade()}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={adicionarAtividade}>
            Salvar
          </button>
        </div>
      </div>

      <ul className="list-group">
        {atividades.map((atividade, index) => (
          <li
            key={index}
            className={`list-group-item ${atividade.finalizado ? 'list-group-item-success' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span style={{ textDecoration: atividade.finalizado ? 'line-through' : 'none' }}>
                {atividade.nome}
              </span>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`checkbox-${index}`}
                  checked={atividade.finalizado}
                  onChange={() => marcarConcluido(index)}
                />
                <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                  Finalizado
                </label>
              </div>
              <button className="btn btn-danger" onClick={() => excluirAtividade(index)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;