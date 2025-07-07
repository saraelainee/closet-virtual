import { useEffect, useState } from "react";
import './Container.css'; // Assumindo que você tem um arquivo CSS compartilhado

// Interface para a tabela Produto
interface Produto {
  idproduto: number;
  nome_produto: string;
  cor_produto: string;
  closet_idcloset: number; // Chave estrangeira para Closet
  categoria_idcategoria: number; // Chave estrangeira para Categoria
}

function ContainerProduto() {
  // Estados para os campos do formulário e mensagens de erro
  const [idproduto, setIDProduto] = useState<string>("");
  const [nome_produto, setNome_Produto] = useState<string>("");
  const [cor_produto, setCor_Produto] = useState<string>("");
  const [closet_idcloset, setCloset_idcloset] = useState<string>(""); // Estado para a FK de Closet
  const [categoria_idcategoria, setCategoria_idcategoria] = useState<string>(""); // Estado para a FK de Categoria
  const [erroMensagem, setErroMensagem] = useState<string>("");

  // Estado para armazenar a lista de produtos fetched do backend
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // useEffect para buscar os dados dos produtos quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Endpoint para buscar todos os PRODUTOS
        // ASSUMIR que este é o endpoint correto no seu backend
        const resposta = await fetch("http://localhost:8000/produtos");
        if (resposta.status === 200) {
          const result = await resposta.json();
          setProdutos(result); // Atualiza o estado com os produtos recebidos
        }
        if (resposta.status === 400) {
          const result = await resposta.json();
          setErroMensagem(result.mensagem); // Define a mensagem de erro se houver
        }
      } catch (erro: any) {
        setErroMensagem("Erro ao realizar o fetch no backend "); // Erro de rede ou servidor
      }
    }
    fetchData(); // Chama a função de busca de dados
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez (no montagem)

  // Função para lidar com o envio do formulário de cadastro de produto
  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Impede o recarregamento da página

    // Cria um novo objeto Produto com os dados do formulário
    const novoProduto: Produto = {
      idproduto: parseInt(idproduto), // Converte o ID para número inteiro
      nome_produto,
      cor_produto,
      closet_idcloset: parseInt(closet_idcloset), // Converte a FK para número
      categoria_idcategoria: parseInt(categoria_idcategoria) // Converte a FK para número
    };

    // Adiciona o novo produto à lista local imediatamente para uma resposta mais rápida na UI
    setProdutos([...produtos, novoProduto]);

    try {
      // Endpoint para enviar o novo produto para o backend via método POST
      // ASSUMIR que este é o endpoint correto no seu backend
      const resposta = await fetch("http://localhost:8000/produtos", {
        method: "POST", // Método HTTP para criação de recurso
        headers: {
          "Content-Type": "application/json" // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(novoProduto) // Converte o objeto JavaScript para JSON
      });

      if (resposta.status === 200) {
        const result = await resposta.json();
        // Se o backend retornar o objeto criado com o ID real, atualiza a lista novamente
        setProdutos([...produtos, result]);
        // Opcional: Limpar os campos do formulário após o sucesso
        setIDProduto("");
        setNome_Produto("");
        setCor_Produto("");
        setCloset_idcloset("");
        setCategoria_idcategoria("");
      }
      if (resposta.status === 400) {
        const result = await resposta.json();
        setErroMensagem(result.mensagem); // Define a mensagem de erro se o backend retornar
      }
    } catch (erro: any) {
      setErroMensagem("Erro ao realizar o fetch no backend "); // Erro de rede ou servidor
    }
  }

  // Funções de tratamento de mudança para cada campo de entrada do formulário
  function trataIDProduto(event: React.ChangeEvent<HTMLInputElement>) {
    setIDProduto(event.target.value);
  }
  function trataNome_Produto(event: React.ChangeEvent<HTMLInputElement>) {
    setNome_Produto(event.target.value);
  }
  function trataCor_Produto(event: React.ChangeEvent<HTMLInputElement>) {
    setCor_Produto(event.target.value);
  }
  function trataCloset_idcloset(event: React.ChangeEvent<HTMLInputElement>) {
    setCloset_idcloset(event.target.value);
  }
  function trataCategoria_idcategoria(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoria_idcategoria(event.target.value);
  }

  return (
    <>
      {erroMensagem && // Exibe mensagem de erro se existir
        <div className="mensagem-erro">
          <p>{erroMensagem}</p>
        </div>
      }

      <div className="container">
        <div className="container-cadastro">
          <h1>Cadastro de Produtos</h1>
          <form onSubmit={trataForm}>
            <label htmlFor="idproduto">ID Produto:</label>
            <input type="number" name="idproduto" id="idproduto" onChange={trataIDProduto} value={idproduto} placeholder="ID Produto" />

            <label htmlFor="nome_produto">Nome do Produto:</label>
            <input type="text" name="nome_produto" id="nome_produto" onChange={trataNome_Produto} value={nome_produto} placeholder="Nome do Produto" />

            <label htmlFor="cor_produto">Cor do Produto:</label>
            <input type="text" name="cor_produto" id="cor_produto" onChange={trataCor_Produto} value={cor_produto} placeholder="Cor do Produto" />

            <label htmlFor="closet_idcloset">ID do Closet:</label>
            <input type="number" name="closet_idcloset" id="closet_idcloset" onChange={trataCloset_idcloset} value={closet_idcloset} placeholder="ID do Closet (FK)" />

            <label htmlFor="categoria_idcategoria">ID da Categoria:</label>
            <input type="number" name="categoria_idcategoria" id="categoria_idcategoria" onChange={trataCategoria_idcategoria} value={categoria_idcategoria} placeholder="ID da Categoria (FK)" />

            <input type="submit" value="Cadastrar Produto" />
          </form>
        </div>
        <div className="container-listagem">
          <h2>Lista de Produtos</h2>
          {produtos.length === 0 ? (
            <p>Nenhum produto cadastrado.</p>
          ) : (
            produtos.map(produto => {
              return (
                // Cada item na lista precisa de uma chave única para otimização do React
                <div className="container-item" key={produto.idproduto}>
                  <div className="item-nome">
                    Nome: {produto.nome_produto}
                  </div>
                  <div className="item-cor">
                    Cor: {produto.cor_produto}
                  </div>
                  <div className="item-closet-id">
                    ID Closet: {produto.closet_idcloset}
                  </div>
                  <div className="item-categoria-id">
                    ID Categoria: {produto.categoria_idcategoria}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

export default ContainerProduto;