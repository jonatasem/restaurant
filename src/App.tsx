import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataFetcher from './components/dataFetcher/DataFetcher';
import Header from './components/header/Header';
import MenuSection from './components/menuSection/MenuSection';
import MenuItem from './components/menuItem/MenuItem';
import ItemDetails from './components/itemDetails/ItemDetails';
import './styles/App.css';
import { Restaurant, Menu } from './types/types';
import Cart from './components/cart/Cart';
import { FaAngleUp, FaAngleDown, FaXmark } from "react-icons/fa6";
import { useMediaQuery } from 'react-responsive';
import { selectItemQuantities } from './redux/selectors'; // Importar o seletor memoizado

const App: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menu, setMenu] = useState<Menu | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState<Menu['sections'][number]['items'][number] | null>(null);
    const [visibleSections, setVisibleSections] = useState<{ [key: number]: boolean }>({});
    const [visibleCart, setVisibleCart] = useState(false);

    // Usando o seletor memoizado
    const itemQuantities = useSelector(selectItemQuantities); // Alteração aqui

    const isMobile = useMediaQuery({ query: '(max-width: 830px)' });

    const handleFetch = (fetchedRestaurant: Restaurant | null, fetchedMenu: Menu | null, fetchError: string | null) => {
        setRestaurant(fetchedRestaurant);
        setMenu(fetchedMenu);
        setError(fetchError);
    };

    useEffect(() => {
        if (menu) {
            const initialVisibleSections = menu.sections.reduce((acc, section) => {
                acc[section.id] = true; // Define todas as seções como visíveis por padrão
                return acc;
            }, {} as { [key: number]: boolean });
            setVisibleSections(initialVisibleSections);
        }
    }, [menu]);

    const handleItemClick = (item: Menu['sections'][number]['items'][number]) => {
        setSelectedItem(item);
    };

    const handleCloseItemDetails = () => {
        setSelectedItem(null);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const toggleSectionVisibility = (sectionId: number) => {
        setVisibleSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId] // Alterna a visibilidade da seção
        }));
    };

    // Exibe mensagem de erro ou busca os dados
    if (error) return <div>{error}</div>;
    if (!restaurant || !menu) return <DataFetcher onFetch={handleFetch} />;

    const totalItemsInCart = Object.values(itemQuantities).reduce((acc: number, curr: number) => acc + curr, 0);

    return (
        <section className={`container-app ${visibleCart ? 'container-mobile' : ''}`}
            style={{
                backgroundColor: restaurant.webSettings.backgroundColour,
                '--primary-color': restaurant.webSettings.primaryColour
            } as React.CSSProperties}
        >
            <Header name={restaurant.name} webSettings={restaurant.webSettings} ccySymbol={restaurant.ccySymbol} />

            <main className='container-main'>
                <input
                    type="text"
                    className="input-search"
                    placeholder='Search menu items'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <section className='layout-menu'>
                    <article className='article-layout'>
                        <div className='list-title'>
                            {menu.sections.map(section => (
                                <MenuSection
                                    key={section.id}
                                    section={section}
                                    primaryColour={restaurant.webSettings.primaryColour}
                                />
                            ))}
                        </div>

                        <div className='menu-itens'>
                            {menu.sections
                                .filter(section => section.name === "Burgers" || section.name === "Drinks")
                                .map(section => (
                                    <div key={section.id}>
                                        <span onClick={() => toggleSectionVisibility(section.id)} style={{ cursor: 'pointer' }}>
                                            <h2>{section.name}</h2>
                                            {visibleSections[section.id] ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                        {visibleSections[section.id] && section.items
                                            .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                            .map(item => (
                                                <MenuItem
                                                    key={item.id}
                                                    item={item}
                                                    currencySymbol={restaurant.ccySymbol}
                                                    onClick={() => handleItemClick(item)}
                                                    quantity={itemQuantities[item.id] || 0} // Usando a quantidade do seletor memoizado
                                                />
                                            ))}
                                    </div>
                                ))}
                        </div>

                        <div className="message-allergy">
                            <p>Ver Allergy information</p>
                        </div>
                    </article>

                    <Cart />
                </section>

                {selectedItem && (
                    <ItemDetails
                        item={selectedItem}
                        currencySymbol={restaurant.ccySymbol}
                        onClose={handleCloseItemDetails}
                    />
                )}
            </main>

            {isMobile && totalItemsInCart > 0 && (
                <footer className='container-footer'>
                    {visibleCart && 
                        <section className='cart-mobile-open'>
                            <div className='layout-mobile'>
                                <Cart />
                                <button id='btn-close-mobile' onClick={() => setVisibleCart(prev => !prev)}>
                                    <FaXmark />
                                </button>
                                <button className='check-now'>Checkout now</button>
                            </div>
                        </section>
                    }
                    <button onClick={() => setVisibleCart(prev => !prev)}>
                        Your basket - {totalItemsInCart} items
                    </button>
                </footer>
            )}
        </section>
    );
};

export default App;