import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Container.css';

interface Categoria {
  idcategoria: number;
  nome_categoria: string;
  descricao: string;
  closet_idcloset: number;
}

function ContainerCategoria() {
  const navigate = useNavigate();

  const [idcategoria, setIDCategoria] = useState("");
  const [nome_categoria, setNomeCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [closet_idcloset, setClosetIdCloset] = useState("");
  const [erroMensagem, setErroMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      const resposta = await fetch("http://localhost:8000/categoria");
      if (resposta.ok) {
        const data = await resposta.json();
        console.log("Categorias recebidas:", data);  // <-- Aqui
        setCategorias(data);
      }
    } catch (erro) {
      setErroMensagem("Erro ao carregar categorias.");
    }
  }

  async function cadastrarCategoria(event: React.FormEvent) {
    event.preventDefault();

    const nova = {
      idcategoria: parseInt(idcategoria),
      nome_categoria,
      descricao,
      closet_idcloset: parseInt(closet_idcloset),
    };

    try {
      const resposta = await fetch("http://localhost:8000/categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nova),
      });

      if (resposta.ok) {
        await buscarCategorias();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao cadastrar.");
      }
    } catch {
      setErroMensagem("Erro de conexão.");
    }
  }

  async function editarCategoria(event: React.FormEvent) {
    event.preventDefault();

    const atualizada = {
      idcategoria: parseInt(idcategoria),
      nome_categoria,
      descricao,
      closet_idcloset: parseInt(closet_idcloset),
    };

    try {
      const resposta = await fetch(`http://localhost:8000/categoria/${idcategoria}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atualizada),
      });

      if (resposta.ok) {
        await buscarCategorias();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao editar.");
      }
    } catch {
      setErroMensagem("Erro de conexão.");
    }
  }

  async function excluirCategoria(id: number) { // 1. Receber o ID (número)
    const confirmar = window.confirm("Deseja realmente excluir?");
    if (!confirmar) return;

    try {
      // 2. Usar o ID na URL
      const resposta = await fetch(`http://localhost:8000/categoria/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        await buscarCategorias();
        setErroMensagem(""); // Limpar erros antigos
      } else {
        // 3. Exibir a mensagem de erro específica vinda do backend
        const data = await resposta.json();
        setErroMensagem(data.erro || "Erro ao excluir categoria.");
      }
    } catch {
      setErroMensagem("Erro de conexão com o servidor.");
    }
  }


  function preencherFormulario(c: Categoria) { //////////////////
    setIDCategoria(c.idcategoria.toString());
    setNomeCategoria(c.nome_categoria);
    setDescricao(c.descricao);
    setClosetIdCloset(c.closet_idcloset.toString());
    setModoEdicao(true);
  }

  function limparFormulario() {
    setIDCategoria("");
    setNomeCategoria("");
    setDescricao("");
    setClosetIdCloset("");
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
          <h1>{modoEdicao ? "Editar Categoria" : "Cadastrar Categoria"}</h1>
          <form onSubmit={modoEdicao ? editarCategoria : cadastrarCategoria}>
            <input type="number" placeholder="ID Categoria" value={idcategoria} onChange={e => setIDCategoria(e.target.value)} required />
            <input type="text" placeholder="Nome da Categoria" value={nome_categoria} onChange={e => setNomeCategoria(e.target.value)} required />
            <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
            <input type="number" placeholder="ID Closet (FK)" value={closet_idcloset} onChange={e => setClosetIdCloset(e.target.value)} required />

            <input type="submit" value={modoEdicao ? "Salvar Edição" : "Cadastrar"} />
            {modoEdicao && <button type="button" onClick={limparFormulario}>Cancelar</button>}
          </form>
        </div>

        <div className="container-listagem">
          <h2>Lista de Categorias</h2>
          {categorias.map(cat => (
            <div className="container-categoria" key={cat.idcategoria}>
              <div><strong>Nome:</strong> {cat.nome_categoria}</div>
              <div><strong>Descrição:</strong> {cat.descricao}</div>
              <div><strong>ID Closet:</strong> {cat.closet_idcloset}</div>

              <div className="botoes-categoria">
                <button onClick={() => preencherFormulario(cat)}>✏️ Editar</button>
                <button onClick={() => excluirCategoria(cat.idcategoria)}>🗑️ Deletar</button>
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

export default ContainerCategoria;
