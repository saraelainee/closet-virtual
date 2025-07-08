import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './Container.css'; // Assuming you have a shared CSS file

// Interface para a tabela Categoria
interface Categoria {
  idcategoria: number;
  nome_categoria: string;
  descricao: string;
  closet_idcloset: number; // Chave estrangeira para Closet
}

function ContainerCategoria() {
  const navigate = useNavigate()
  const [idcategoria, setIDCategoria] = useState<string>("");
  const [nome_categoria, setNome_Categoria] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [closet_idcloset, setCloset_idcloset] = useState<string>(""); // Estado para a FK
  const [erroMensagem, setErroMensagem] = useState<string>("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Endpoint para CATEGORIAS
        const resposta = await fetch("http://localhost:8000/categorias"); // ASSUMIR que este é o endpoint correto
        if (resposta.status === 200) {
          const result = await resposta.json();
          setCategorias(result);
        }
        if (resposta.status === 400) {
          const result = await resposta.json();
          setErroMensagem(result.mensagem);
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao realizar o fetch no backend ");
      }
    }
    fetchData();
  }, []);

  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const novaCategoria: Categoria = {
      idcategoria: parseInt(idcategoria),
      nome_categoria,
      descricao,
      closet_idcloset: parseInt(closet_idcloset) // Converte a FK para número
    };

    setCategorias([...categorias, novaCategoria]); // Adiciona à lista local

    try {
      // Endpoint para CATEGORIAS
      const resposta = await fetch("http://localhost:8000/categorias", { // ASSUMIR que este é o endpoint correto
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novaCategoria)
      });

      if (resposta.status === 200) {
        const result = await resposta.json();
        setCategorias([...categorias, result]); // Se o backend retornar o objeto criado
      }
      if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem);
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao realizar o fetch no backend ");
    }
  }

  function trataIDCategoria(event: React.ChangeEvent<HTMLInputElement>) {
    setIDCategoria(event.target.value);
  }
  function trataNome_Categoria(event: React.ChangeEvent<HTMLInputElement>) {
    setNome_Categoria(event.target.value);
  }
  function trataDescricao(event: React.ChangeEvent<HTMLInputElement>) {
    setDescricao(event.target.value);
  }
  function trataCloset_idcloset(event: React.ChangeEvent<HTMLInputElement>) {
    setCloset_idcloset(event.target.value);
  }

  return (
    <>
      {erroMensagem &&
        <div className="mensagem-erro">
          <p>{erroMensagem}</p>
        </div>
      }

      <div className="container">
        <div className="container-cadastro">
          <h1>Cadastro de Categorias</h1>
          <form onSubmit={trataForm}>
            <label htmlFor="idcategoria">ID Categoria:</label>
            <input type="number" name="idcategoria" id="idcategoria" onChange={trataIDCategoria} value={idcategoria} placeholder="ID Categoria" />

            <label htmlFor="nome_categoria">Nome da Categoria:</label>
            <input type="text" name="nome_categoria" id="nome_categoria" onChange={trataNome_Categoria} value={nome_categoria} placeholder="Nome da Categoria" />

            <label htmlFor="descricao">Descrição:</label>
            <input type="text" name="descricao" id="descricao" onChange={trataDescricao} value={descricao} placeholder="Descrição" />

            <label htmlFor="closet_idcloset">ID do Closet:</label>
            <input type="number" name="closet_idcloset" id="closet_idcloset" onChange={trataCloset_idcloset} value={closet_idcloset} placeholder="ID do Closet (FK)" />

            <input type="submit" value="Cadastrar Categoria" />
          </form>
        </div>
        <div className="container-listagem">
          {categorias.map(categoria => {
            return (
              <div className="container-categoria" key={categoria.idcategoria}>
                <div className="categoria-nome">
                  Nome: {categoria.nome_categoria}
                </div>
                <div className="categoria-descricao">
                  Descrição: {categoria.descricao}
                </div>
                <div className="categoria-closet-id">
                  ID Closet: {categoria.closet_idcloset}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={() => navigate('/')} className="Container-button">
        Voltar para Página Inicial
      </button>
    </>
  )
}

export default ContainerCategoria;