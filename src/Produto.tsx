import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Container.css';

interface Produto {
  idproduto: number;
  nome_produto: string;
  cor_produto: string;
  closet_idcloset: number;
  categoria_idcategoria: number;
}

function ContainerProduto() {
  const navigate = useNavigate();

  const [idproduto, setIDProduto] = useState("");
  const [nome_produto, setNomeProduto] = useState("");
  const [cor_produto, setCorProduto] = useState("");
  const [closet_idcloset, setClosetIdCloset] = useState("");
  const [categoria_idcategoria, setCategoriaIdCategoria] = useState("");
  const [erroMensagem, setErroMensagem] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const resposta = await fetch("http://localhost:8000/produto");
      if (resposta.ok) {
        const data = await resposta.json();
        setProdutos(data);
      }
    } catch {
      setErroMensagem("Erro ao carregar produtos.");
    }
  }

  async function cadastrarProduto(event: React.FormEvent) {
    event.preventDefault();

    const novo = {
      nome_produto,
      cor_produto,
      closet_idcloset: parseInt(closet_idcloset),
      categoria_idcategoria: parseInt(categoria_idcategoria),
    };

    try {
      const resposta = await fetch("http://localhost:8000/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      if (resposta.ok) {
        await buscarProdutos();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao cadastrar produto.");
      }
    } catch {
      setErroMensagem("Erro de conexão.");
    }
  }

  async function editarProduto(event: React.FormEvent) {
    event.preventDefault();

    const atual = {
      idproduto: parseInt(idproduto),
      nome_produto,
      cor_produto,
      closet_idcloset: parseInt(closet_idcloset),
      categoria_idcategoria: parseInt(categoria_idcategoria),
    };

    try {
      const resposta = await fetch(`http://localhost:8000/produto/${idproduto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atual),
      });

      if (resposta.ok) {
        await buscarProdutos();
        limparFormulario();
      } else {
        const data = await resposta.json();
        setErroMensagem(data.mensagem || "Erro ao editar produto.");
      }
    } catch {
      setErroMensagem("Erro de conexão.");
    }
  }

  async function excluirProduto(id: number) {
    const confirmar = window.confirm("Deseja realmente excluir?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:8000/produto/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        await buscarProdutos();
        setErroMensagem("");
      } else {
        const data = await resposta.json();
        setErroMensagem(data.erro || "Erro ao excluir produto.");
      }
    } catch {
      setErroMensagem("Erro de conexão com o servidor.");
    }
  }

  function preencherFormulario(p: Produto) {
    setIDProduto(p.idproduto.toString());
    setNomeProduto(p.nome_produto);
    setCorProduto(p.cor_produto);
    setClosetIdCloset(p.closet_idcloset.toString());
    setCategoriaIdCategoria(p.categoria_idcategoria.toString());
    setModoEdicao(true);
  }

  function limparFormulario() {
    setIDProduto("");
    setNomeProduto("");
    setCorProduto("");
    setClosetIdCloset("");
    setCategoriaIdCategoria("");
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
          <h1>{modoEdicao ? "Editar Produto" : "Cadastrar Produto"}</h1>
          <form onSubmit={modoEdicao ? editarProduto : cadastrarProduto}>
            {modoEdicao && (
              <input
                type="number"
                placeholder="ID Produto"
                value={idproduto}
                disabled
              />
            )}
            <input
              type="text"
              placeholder="Nome do Produto"
              value={nome_produto}
              onChange={e => setNomeProduto(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cor do Produto"
              value={cor_produto}
              onChange={e => setCorProduto(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="ID Closet (FK)"
              value={closet_idcloset}
              onChange={e => setClosetIdCloset(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="ID Categoria (FK)"
              value={categoria_idcategoria}
              onChange={e => setCategoriaIdCategoria(e.target.value)}
              required
            />

            <input type="submit" value={modoEdicao ? "Salvar Edição" : "Cadastrar"} />
            {modoEdicao && (
              <button type="button" onClick={limparFormulario}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        <div className="container-listagem">
          <h2>Lista de Produtos</h2>
          {produtos.map(prod => (
            <div className="container-item" key={prod.idproduto}>
              <div><strong>Nome:</strong> {prod.nome_produto}</div>
              <div><strong>Cor:</strong> {prod.cor_produto}</div>
              <div><strong>ID Closet:</strong> {prod.closet_idcloset}</div>
              <div><strong>ID Categoria:</strong> {prod.categoria_idcategoria}</div>
              <div className="botoes-categoria">
                <button onClick={() => preencherFormulario(prod)}>✏️ Editar</button>
                <button onClick={() => excluirProduto(prod.idproduto)}>🗑️ Deletar</button>
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

export default ContainerProduto;
