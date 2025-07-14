import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './padrao.css';

type Closet = {
    idcloset: number;
    nome_closet: string;
    proprietario: string;
};

type Categoria = {
    idcategoria: number;
    nome_categoria: string;
    descricao: string;
    closet_idcloset: number;
};

type Produto = {
    idproduto: number;
    nome_produto: string;
    cor_produto: string;
    closet_idcloset: number;
    categoria_idcategoria: number;
};

export default function MostraTudo() {

    const navigate = useNavigate();
    const [closets, setClosets] = useState<Closet[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [erroMensagem, setErroMensagem] = useState("");

    async function buscarDados() {
        try {
            const respostaCloset = await fetch("http://localhost:8000/closet");
            const respostaCategoria = await fetch("http://localhost:8000/categoria");
            const respostaProduto = await fetch("http://localhost:8000/produto");

            if (respostaCloset.ok && respostaCategoria.ok && respostaProduto.ok) {
                const dataCloset: Closet[] = await respostaCloset.json();
                const dataCategoria: Categoria[] = await respostaCategoria.json();
                const dataProduto: Produto[] = await respostaProduto.json();

                setClosets(dataCloset);
                setCategorias(dataCategoria);
                setProdutos(dataProduto);
            } else {
                setErroMensagem("Erro ao carregar dados.");
            }
        } catch (erro) {
            setErroMensagem("Erro de conexão com o servidor.");
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <>
        <Header />
        <div className="mostratudo">
            <h1>Dados do Closet Virtual</h1>
            <p>Esta página exibe todos os dados do seu closet virtual.</p>
            {erroMensagem && <p className="error">{erroMensagem}</p>}

            <button onClick={() => navigate('/closet')}>Gerenciar Closets</button>
            <button onClick={() => navigate('/categoria')}>Gerenciar Categorias</button>
            <button onClick={() => navigate('/produto')}>Gerenciar Produtos</button>

            <h2>Closets</h2>

            {closets.map(closet => (
                <li key={closet.idcloset}>
                    {closet.nome_closet} - Proprietário: {closet.proprietario}
                </li>
            ))}
            <h2>Categorias</h2>
            {categorias.map(categoria => (
                <li key={categoria.idcategoria}>
                    {categoria.nome_categoria} - Descrição: {categoria.descricao} - Closet ID: {categoria.closet_idcloset}
                </li>
            ))}
            <h2>Produtos</h2>
            {produtos.map(produto => (
                <li key={produto.idproduto}>
                    {produto.nome_produto} - Cor: {produto.cor_produto} - Closet ID: {produto.closet_idcloset} - Categoria ID: {produto.categoria_idcategoria}
                </li>
            ))}
        </div>
        </>
    );
}