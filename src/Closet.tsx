import { useEffect, useState } from "react";
import './Container.css'; // Assumindo que você tem um arquivo CSS compartilhado

// Interface para a tabela Closet
interface Closet {
  idcloset: number;
  nome_closet: string;
  proprietario: string;
}

function ContainerCloset() {
  // Estados para os campos do formulário e mensagens de erro
  const [idcloset, setIDCloset] = useState<string>("");
  const [nome_closet, setNome_Closet] = useState<string>("");
  const [proprietario, setProprietario] = useState<string>("");
  const [erroMensagem, setErroMensagem] = useState<string>("");

  // Estado para armazenar a lista de closets fetched do backend
  const [closets, setClosets] = useState<Closet[]>([]);

  // useEffect para buscar os dados dos closets quando o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Endpoint para buscar todos os CLOSETS
        // ASSUMIR que este é o endpoint correto no seu backend
        const resposta = await fetch("http://localhost:8000/closets");
        if (resposta.status === 200) {
          const result = await resposta.json();
          setClosets(result); // Atualiza o estado com os closets recebidos
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

  // Função para lidar com o envio do formulário de cadastro de closet
  async function trataForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Impede o recarregamento da página

    // Cria um novo objeto Closet com os dados do formulário
    const novoCloset: Closet = {
      idcloset: parseInt(idcloset), // Converte o ID para número inteiro
      nome_closet,
      proprietario,
    };

    // Adiciona o novo closet à lista local imediatamente para uma resposta mais rápida na UI
    setClosets([...closets, novoCloset]);

    try {
      // Endpoint para enviar o novo closet para o backend via método POST
      // ASSUMIR que este é o endpoint correto no seu backend
      const resposta = await fetch("http://localhost:8000/closets", {
        method: "POST", // Método HTTP para criação de recurso
        headers: {
          "Content-Type": "application/json" // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(novoCloset) // Converte o objeto JavaScript para JSON
      });

      if (resposta.status === 200) {
        const result = await resposta.json();
        // Se o backend retornar o objeto criado com o ID real, atualiza a lista novamente
        setClosets([...closets, result]);
        // Opcional: Limpar os campos do formulário após o sucesso
        setIDCloset("");
        setNome_Closet("");
        setProprietario("");
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
  function trataIDCloset(event: React.ChangeEvent<HTMLInputElement>) {
    setIDCloset(event.target.value);
  }
  function trataNome_Closet(event: React.ChangeEvent<HTMLInputElement>) {
    setNome_Closet(event.target.value);
  }
  function trataProprietario(event: React.ChangeEvent<HTMLInputElement>) {
    setProprietario(event.target.value);
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
          <h1>Cadastro de Closets</h1>
          <form onSubmit={trataForm}>
            <label htmlFor="idcloset">ID Closet:</label>
            <input type="number" name="idcloset" id="idcloset" onChange={trataIDCloset} value={idcloset} placeholder="ID Closet" />

            <label htmlFor="nome_closet">Nome do Closet:</label>
            <input type="text" name="nome_closet" id="nome_closet" onChange={trataNome_Closet} value={nome_closet} placeholder="Nome do Closet" />

            <label htmlFor="proprietario">Proprietário:</label>
            <input type="text" name="proprietario" id="proprietario" onChange={trataProprietario} value={proprietario} placeholder="Proprietário" />

            <input type="submit" value="Cadastrar Closet" />
          </form>
        </div>
        <div className="container-listagem">
          <h2>Lista de Closets</h2>
          {closets.length === 0 ? (
            <p>Nenhum closet cadastrado.</p>
          ) : (
            closets.map(closet => {
              return (
                // Cada item na lista precisa de uma chave única para otimização do React
                <div className="container-item" key={closet.idcloset}>
                  <div className="item-nome">
                    Nome: {closet.nome_closet}
                  </div>
                  <div className="item-proprietario">
                    Proprietário: {closet.proprietario}
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

export default ContainerCloset;