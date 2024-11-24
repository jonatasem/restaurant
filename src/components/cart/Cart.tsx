import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'; 
import { increaseQuantity, decreaseQuantity } from '../../redux/cartSlice';
import { CartItem } from '../../types/types'; // Ajuste o caminho conforme necessário
import './Cart.css';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items) as CartItem[]; // Seleciona itens do carrinho

    // Função para calcular o total do carrinho
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2); // Calcula o total
    };

    return (
        <section className='container-cart'>
            <div className='cart-layout'>
                <h2>Basket</h2>
                {cartItems.length === 0 ? (
                    <div className='message-empty'>
                        <p>Seu carrinho está vazio.</p> {/* Mensagem caso o carrinho esteja vazio */}
                    </div>
                ) : (
                    <article>
                        {cartItems.map(item => (
                            <article className='cart-item' key={item.id}>
                                <div>
                                    <span>
                                        <p className='name-item-cart'>{item.name}</p> {/* Nome do item */}
                                        {item.modifiers && item.modifiers.length > 0 && (
                                            <ul>
                                                {item.modifiers.map(modifier => {
                                                    // Calcula o selectedPrice para o modificador
                                                    const selectedPrice = modifier.items
                                                        .filter(option => modifier.selectedItems.includes(option.name))
                                                        .reduce((acc, option) => acc + option.price, 0); // Soma os preços das opções selecionadas

                                                    return (
                                                        <li key={modifier.id}>
                                                            {modifier.selectedItems.length > 0 ? modifier.selectedItems.join(', ') : ''} {/* Exibe opções selecionadas */}
                                                            <span>(+R$ {selectedPrice.toFixed(2)})</span> {/* Exibe o selectedPrice */}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                        <div className='quantity-controls'>
                                            <button 
                                                className='cart-control-decre' 
                                                onClick={() => dispatch(decreaseQuantity(item.id))} 
                                                disabled={item.quantity <= 1} // Desabilita se a quantidade for 1
                                            >
                                                -
                                            </button>
                                            <p className='quantity-item-cart'>{item.quantity}</p> {/* Exibe a quantidade do item */}
                                            <button 
                                                className='cart-control-incre' 
                                                onClick={() => dispatch(increaseQuantity(item.id))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </span>
                                    <p className='price-item-cart'>R$ {item.price.toFixed(2)}</p> {/* Preço do item */}
                                </div>
                            </article>
                        ))}
                        <div className='cart-summary'>
                            <span className='sub-total'>
                                <p>Sub total: </p>
                                <p>R$ {calculateTotal()}</p> {/* Exibe subtotal */}
                            </span>
                            <span className='total-layout'>
                                <p className='title-total'>Total: </p>
                                <p className='price-total'>R$ {calculateTotal()}</p> {/* Exibe total */}
                            </span>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
};

export default Cart;