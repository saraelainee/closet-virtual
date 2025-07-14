import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Container.css';

interface Closet {
  idcloset: number;
  nome_closet: string;
  proprietario: string;
}

function ContainerCloset() {
  const navigate = useNavigate();

  const [idcloset, setIDCloset] = useState("");
  const [nome_closet, setNomeCloset] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [erroMensagem, setErroMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const [closets, setClosets] = useState<Closet[]>([]);

  useEffect(() => {
    buscarClosets();
  }, []);

  async function buscarClosets() {
    try {
      const resposta = await fetch("http://localhost:8000/closet");
      if (resposta.ok) {
        const data = await resposta.json();
        setClosets(data);
      }
    } catch {
      setErroMensagem("Erro ao carregar closets.");
    }
  }

  async function cadastrarCloset(event: React.FormEvent) {
    event.preventDefault();

    const novo = {
      nome_closet,
      proprietario,
    };

    try {
      const resposta = await fetch("http://localhost:8000/closet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      if (resposta.ok) {
        await buscarClosets();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao cadastrar closet.");
      }
    } catch {
      setErroMensagem("Erro de conexão com o servidor.");
    }
  }

  async function editarCloset(event: React.FormEvent) {
    event.preventDefault();

    const atual = {
      idcloset: parseInt(idcloset),
      nome_closet,
      proprietario,
    };

    try {
      const resposta = await fetch(`http://localhost:8000/closet/${idcloset}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atual),
      });

      if (resposta.ok) {
        await buscarClosets();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao editar closet.");
      }
    } catch {
      setErroMensagem("Erro de conexão com o servidor.");
    }
  }

  async function excluirCloset(id: number) {
    const confirmar = window.confirm("Deseja realmente excluir?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:8000/closet/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        await buscarClosets();
        setErroMensagem("");
      } else {
        const data = await resposta.json();
        setErroMensagem(data.erro || "Erro ao excluir closet.");
      }
    } catch {
      setErroMensagem("Erro de conexão com o servidor.");
    }
  }

  function preencherFormulario(c: Closet) {
    setIDCloset(c.idcloset.toString());
    setNomeCloset(c.nome_closet);
    setProprietario(c.proprietario);
    setModoEdicao(true);
  }

  function limparFormulario() {
    setIDCloset("");
    setNomeCloset("");
    setProprietario("");
    setModoEdicao(false);
    setErroMensagem("");
  }

  return (
    <>
      {erroMensagem && (
        <div className="mensagem-erro">
          <p>{erroMensagem}</p>
        </div>
      )}

      <div className="container">
        <div className="container-cadastro">
          <h1>{modoEdicao ? "Editar Closet" : "Cadastrar Closet"}</h1>
          <form onSubmit={modoEdicao ? editarCloset : cadastrarCloset}>
            {modoEdicao && (
              <input
                type="number"
                placeholder="ID Closet"
                value={idcloset}
                onChange={e => setIDCloset(e.target.value)}
                disabled
              />
            )}
            <input
              type="text"
              placeholder="Nome do Closet"
              value={nome_closet}
              onChange={e => setNomeCloset(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Proprietário"
              value={proprietario}
              onChange={e => setProprietario(e.target.value)}
              required
            />
            <input
              type="submit"
              value={modoEdicao ? "Salvar Edição" : "Cadastrar"}
            />
            {modoEdicao && (
              <button type="button" onClick={limparFormulario}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="container-listagem">
          <h2>Lista de Closets</h2>
          {closets.map(closet => (
            <div className="container-item" key={closet.idcloset}>
              <div><strong>Nome:</strong> {closet.nome_closet}</div>
              <div><strong>Proprietário:</strong> {closet.proprietario}</div>

              <div className="botoes-categoria">
                <button onClick={() => preencherFormulario(closet)}>✏️ Editar</button>
                <button onClick={() => excluirCloset(closet.idcloset)}>🗑️ Deletar</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/')} className="Container-button">
        Voltar
      </button>
    </>
  );
}

export default ContainerCloset;
