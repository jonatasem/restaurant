import { createSelector } from 'reselect';
import { RootState } from '../redux/store';

// Seletor para obter os itens do carrinho
const getCartItems = (state: RootState) => state.cart.items;

// Seletor memoizado para calcular as quantidades dos itens
export const selectItemQuantities = createSelector(
    [getCartItems],
    (items) => {
        return items.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {} as Record<number, number>);
    }
);
