import './header.css'; // Importe o novo arquivo CSS

function Header() {
    return (
        <header>
            <nav className="top-nav">
                <div className="top-nav-links">
                    <a href="#">Central do Vendedor</a>
                    <a href="#">Vender</a>
                    <a href="#">Baixe o App</a>
                    <span>Siga-nos no</span>
                    <a href="#" aria-label="Instagram">📷</a>
                    <a href="#" aria-label="X">🐦</a>
                    <a href="#" aria-label="TikTok">🎵</a>
                </div>
                <ul className="top-nav-user">
                    <li><a href="#">Notificações</a></li>
                    <li><a href="#">Ajuda</a></li>
                    <li><a href="#">Português (BR)</a></li>
                    <li><a href="#" className="auth-link signup">Cadastrar</a></li>
                    <li><a href="#" className="auth-link login">Entrar</a></li>
                </ul>
            </nav>
            <div className="main-header">
                <div className="header-logo">
                    <a href="/">Closet Virtual</a>
                </div>
                <div className="header-search">
                    <input type="text" placeholder="Encontre peças, categorias e mais..."/>
                    <button>Pesquisar</button>
                </div>
                <div className="header-cart">
                    <a href="#">
                        <span>🛒</span>
                        <span>Carrinho</span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;