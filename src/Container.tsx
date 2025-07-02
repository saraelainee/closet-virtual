import { useEffect, useState } from "react";
import './Container.css';

// Interface 'closetState' mantida com 'preco' e 'categoria',
// mas agora o id é 'idcloset' e o nome é 'nome_closet'
interface closetState {
  idcloset: number; // Nome do ID conforme sua tabela closet
  nome_closet: string; // Nome do campo conforme sua tabela closet
  preco: number;      // Mantido como estava no seu código original
  categoria: string;  // Mantido como estava no seu código original
}

function Container(){
  // Renomeando as variáveis de estado para refletir "closet"
  const [idcloset,setIDcloset] = useState("");
  const [nome_closet,setNome_closet] = useState("");
  const [preco,setPreco] = useState(""); // Mantido
  const [erroMensagem,setErroMensagem] = useState("");
  const [categoria,setCategoria] = useState(""); // Mantido

  // Renomeando 'produtos' para 'closets' (lista de objetos do tipo closetState)
  const [closets,setClosets] = useState<closetState[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
      try{
    // O endpoint ainda é '/produtos', pois você pediu para não modificar a lógica
    const resposta = await fetch("http://localhost:8000/produtos")
    if(resposta.status === 200){ // Use === para comparação estrita
     const result = await resposta.json();
    setClosets(result); // Setando 'closets'
    }
    if(resposta.status === 400){ // Use === para comparação estrita
      const result = await resposta.json();
    setErroMensagem(result.mensagem);
    }
  }
      catch (erro:any){
      setErroMensagem("Erro ao realizar o fetch no backend ");
    }
  }
    fetchData();
  },[]); //[] lista de dependências, quando ela muda o useEffect é executado novamente
  // useEffect é um hook que permite executar código quando o componente é montado, atualizado ou desmontado

  async function trataForm(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    // O objeto continua sendo criado com preco e categoria
    const closetNovo: closetState = { // Renomeado para 'closetNovo'
      idcloset: parseInt(idcloset),
      nome_closet,
      preco: parseFloat(preco),
      categoria
    };
    // Adiciona ao estado 'closets'
    setClosets([...closets, closetNovo]); // Adiciona 'closetNovo'

    try{
    // O endpoint ainda é '/produtos', pois você pediu para não modificar a lógica
    const resposta = await fetch("http://localhost:8000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(closetNovo) // Enviando 'closetNovo'
      })
    if(resposta.status === 200){ // Use === para comparação estrita
     const result = await resposta.json();
     // Atualiza o estado 'closets'
     setClosets([...closets, result]); // Adiciona o resultado
    }
    if(resposta.status === 400){ // Use === para comparação estrita
      const result = await resposta.json();
    setErroMensagem(result.mensagem);
    }
    }catch (erro:any){
      setErroMensagem("Erro ao realizar o fetch no backend ");
    }
  }

  // Funções de tratamento de input - nomes de variáveis de estado já ajustados acima
  function trataIdcloset(event: React.ChangeEvent<HTMLInputElement>){
    setIDcloset(event.target.value);
  }
  function trataNome_closet(event: React.ChangeEvent<HTMLInputElement>){
    setNome_closet(event.target.value);
  }
  function trataPreco(event: React.ChangeEvent<HTMLInputElement>){
    setPreco(event.target.value);
  }
  function trataCategoria(event: React.ChangeEvent<HTMLInputElement>){
    setCategoria(event.target.value);
  }

  return(
    <>
    {erroMensagem &&
    <div className="mensagem-erro">
      <p>{erroMensagem}</p>
    </div>
    }

      <div className="container">

        <div className="container-cadastro">
            <h1>Cadastro de Closets</h1> {/* Título alterado */}
            <form onSubmit={trataForm}>
                {/* IDs dos inputs alterados para corresponder aos nomes da interface */}
                <input type="text" name="idcloset" id="idcloset" onChange={trataIdcloset} value={idcloset} placeholder="ID do Closet" />
                <input type="text" name="nome_closet" id="nome_closet" onChange={trataNome_closet} value={nome_closet} placeholder="Nome do Closet" />
                <input type="text" name="preco" id="preco" onChange={trataPreco} value={preco} placeholder="Preço" />
                <input type="text" name="categoria" id="categoria" onChange={trataCategoria} value={categoria} placeholder="Categoria" />
                <input type="submit" value="Cadastrar Closet" /> {/* Texto do botão alterado */}
            </form>
        </div>
        <div className="container-listagem">
            {/* Mapeando 'closets' (plural) e referenciando 'closet' (singular) */}
            {closets.map(closet => { // Variável no map renomeada de 'produto' para 'closet'
                return(
                    <div className="container-closet" key={closet.idcloset}> {/* Key usando idcloset */}
                        <div className="nomecloset"> {/* Nome da classe mantido, mas exibe nome_closet */}
                            Nome do Closet: {closet.nome_closet}
                        </div>
                        <div className="closet-preco"> {/* Nome da classe ajustado */}
                            Preço: {closet.preco}
                        </div>
                        <div className="closet-categoria"> {/* Nome da classe ajustado */}
                            Categoria: {closet.categoria}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </>
  )
}
export default Container;