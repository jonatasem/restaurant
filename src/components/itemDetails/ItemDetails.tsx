import React, { useState } from 'react';
import { Menu } from '../../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; 
import './ItemDetails.css';
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";

// Props do componente ItemDetails
interface ItemDetailsProps {
    item: Menu['sections'][number]['items'][number]; // Tipo do item
    currencySymbol: string; // Símbolo da moeda
    onClose: () => void; // Função para fechar o modal
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, currencySymbol, onClose }) => {
    const dispatch = useDispatch(); // Hook para despachar ações do Redux
    const [selectedOption, setSelectedOption] = useState<number | null>(null); // Opção selecionada
    const [quantity, setQuantity] = useState<number>(1); // Quantidade do item

    // Manipula a mudança de opção
    const handleOptionChange = (optionId: number) => {
        setSelectedOption(optionId); // Atualiza a opção selecionada
    };

    // Obtém o preço do item selecionado
    const selectedPrice = item.modifiers?.length ? (
        selectedOption !== null
            ? item.modifiers.flatMap(modifier =>
                modifier.items.filter(option => option.id === selectedOption)).map(option => option.price)[0] || item.price
            : item.price
    ) : item.price;

    // Manipula o incremento da quantidade
    const handleIncrement = () => setQuantity(prev => prev + 1); // Aumenta a quantidade

    // Manipula o decremento da quantidade
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1)); // Diminui a quantidade, mas não abaixo de 1

    // Adiciona o item ao carrinho
    const handleAddToCart = () => {
        const cartItem = {
            id: item.id,
            name: item.name,
            price: selectedPrice,
            quantity,
            modifiers: item.modifiers?.map(modifier => ({
                id: modifier.id,
                name: modifier.name,
                selectedItems: modifier.items.filter(option => option.id === selectedOption).map(option => option.name),
                items: modifier.items // Inclui todos os itens do modificador
            })) || []
        };
        dispatch(addToCart(cartItem)); // Despacha a ação para adicionar ao carrinho
        onClose(); // Fecha o modal
    };

    return (
        <section className="item-details">
            <article>
                {item.images?.[0] && (
                    <img src={item.images[0].image} alt={item.name} className="item-image" /> // Exibe a imagem do item
                )}
                <section className='details-list'>
                    <h2>{item.name}</h2>
                    <p className='item-descript'>{item.description}</p>
                </section>
                {item.modifiers && (
                    <ul className='container-modifiers'>
                        {item.modifiers.map(modifier => (
                            <li key={modifier.id}>
                                <strong>{modifier.name}</strong>
                                <ul>
                                    {modifier.items.map(option => (
                                        <li key={option.id}>
                                            <input 
                                                type="radio" 
                                                name={modifier.name} 
                                                id={option.name} 
                                                onChange={() => handleOptionChange(option.id)} // Atualiza o estado ao selecionar uma opção
                                                checked={selectedOption === option.id} // Marca a opção selecionada
                                            />
                                            <label htmlFor={option.name}>
                                                {option.name} - {currencySymbol}{option.price.toFixed(2)} {/* Exibe nome e preço da opção */}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
                <section className='quantity-controls-details'>
                    <button onClick={handleDecrement} disabled={quantity <= 1}><FaMinus /></button> {/* Botão para diminuir a quantidade */}
                    <span>{quantity}</span> {/* Exibe a quantidade atual */}
                    <button id='btn-mais' onClick={handleIncrement}><FaPlus /></button> {/* Botão para aumentar a quantidade */}
                </section>
                <section className='btn-adicionar-item'>
                    <button onClick={handleAddToCart}>
                        Add to Order <li></li> {currencySymbol}{(selectedPrice * quantity).toFixed(2)} {/* Exibe preço total do item */}
                    </button>
                </section>
                <button className='btn-fechar-details' onClick={onClose}>
                    <IoMdClose /> {/* Botão para fechar detalhes do item */}
                </button>
            </article>
        </section>
    );
};

export default ItemDetails;