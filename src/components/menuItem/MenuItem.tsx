import React from 'react';
import './MenuItem.css';

// Componente MenuItem que exibe um item do menu
interface MenuItemProps {
    item: {
        id: number;
        name: string;
        description: string;
        price: number;
        images?: Array<{ id: number; image: string }>; // Imagens do item
    };
    currencySymbol: string; // Símbolo da moeda
    onClick: () => void; // Função chamada ao clicar no item
    quantity: number; // Quantidade do item
}

const MenuItem: React.FC<MenuItemProps> = ({ item, currencySymbol, onClick, quantity }) => {
    const imageUrl = item.images?.[0]?.image || ''; // URL da imagem, se existir

    return (
        <section className='menu-itens' onClick={onClick}> {/* Chama onClick ao clicar na seção */}
            <article className='list-itens'>
                <div className='quantity-itens'>
                    <span>
                        {quantity > 0 && <strong className='quantity-indicator'>{quantity}</strong>} {/* Exibe quantidade se maior que 0 */}
                        <h3>{item.name}</h3> {/* Nome do item */}
                    </span>
                    <p className='description'>{item.description}</p> {/* Descrição do item */}
                    <p>{currencySymbol}{item.price.toFixed(2)}</p> {/* Preço formatado do item */}
                </div>
                <div className='list-img-menu'>
                    {imageUrl && <img src={imageUrl} alt={item.name} />} {/* Exibe a imagem, caso exista */}
                </div>
            </article>
        </section>
    );
};

export default MenuItem;