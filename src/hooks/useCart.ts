import { useSelector } from 'react-redux';
import { selectItemQuantities } from '../redux/selectors';

// Hook personalizado para gerenciar o carrinho de compras.
const useCart = () => {
    const itemQuantities = useSelector(selectItemQuantities); // Obtém as quantidades de itens do estado global

    // Calcula o total de itens no carrinho somando as quantidades.
    const totalItemsInCart = Object.values(itemQuantities).reduce((acc, curr) => acc + curr, 0);

    return { itemQuantities, totalItemsInCart }; // Retorna as quantidades de itens e o total de itens no carrinho
};

export default useCart;