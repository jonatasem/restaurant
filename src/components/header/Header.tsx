import { Restaurant } from '../../types/types'; // Interface
import { IoMenu } from "react-icons/io5"; // Ícone
import './Header.css'; // CSS

// Componente Header que exibe o cabeçalho da aplicação
const Header: React.FC<Restaurant> = ({ webSettings }) => {
    return (
        <header className='container-header' style={{ backgroundColor: webSettings.navBackgroundColour }}> 
            <nav className="container-navbar">
                <ul>
                    <li className='active'>Menu</li>
                    <li>Entrar</li>
                    <li>Contato</li>
                </ul>
            </nav>
            <section>
                <article className="mobile">
                    <ul>
                        <li>Menu</li> {/* Item de menu mobile */}
                    </ul>
                </article>
                <article className="nav-mobile">
                    <IoMenu /> {/* Ícone de menu mobile */}
                </article>
            </section>
            <img src={webSettings.bannerImage} alt="Banner" /> {/* Banner do restaurante */}
        </header>
    );
};

export default Header;