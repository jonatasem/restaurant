import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Certifique-se de que o caminho está correto
import { CartItem } from '../types/types'; // Ajuste o caminho conforme necessário

// Estado inicial do carrinho
interface CartState {
    items: CartItem[]; // Array de itens no carrinho
}

const initialState: CartState = {
    items: [], // Inicializa o carrinho como vazio
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Adiciona um item ao carrinho
        addToCart(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity; // Aumenta a quantidade se já existir
            } else {
                state.items.push(action.payload); // Adiciona novo item ao carrinho
            }
        },
        // Aumenta a quantidade de um item específico
        increaseQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1; // Aumenta a quantidade do item
            }
        },
        // Diminui a quantidade de um item específico
        decreaseQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1; // Diminui a quantidade do item, se maior que 1
            }
        },
    },
});

// Seletor para obter a quantidade de um item específico no carrinho
export const selectItemQuantity = (state: RootState, itemId: number) => {
    const item = state.cart.items.find(item => item.id === itemId);
    return item ? item.quantity : 0; // Retorna a quantidade ou 0 se não existir
};

// Exporta as ações do slice
export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer; // Exporta o reducer
