async function buscaDados() {
            const resposta = await fetch("http://localhost:8000/produtos")
            console.log(resposta)
            if (resposta.status === 200) {
                const dados = await resposta.json()
                console.log(dados)
                const ul = document.getElementById("produtos")
                
                for (let i = 0; i < dados.length; i++) {
                    const obj = dados[i];
 
                    const li = document.createElement("li")

                    li.innerText = `${obj.id}. ${obj.nome} - ${obj.preco} (${obj.categoria})`

                    ul.appendChild(li)
                }


            } else {
                if (resposta.status === 400) {
                    const dados = await resposta.json()
                    alert(dados.mensagem)
                    console.log(obj.contemProdutos)
                } else {
                    console.log("Erro Desconhecido!")
                }
            }

        }
        buscaDados()