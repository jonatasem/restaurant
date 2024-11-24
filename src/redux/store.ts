import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Importa o reducer do carrinho

// Configuração da store do Redux, combinando reducers
const store = configureStore({
    reducer: {
        cart: cartReducer, // O reducer do carrinho é adicionado à store
    },
});

// Tipos para uso em seletores e dispatches
export type RootState = ReturnType<typeof store.getState>; // Tipo do estado da store
export type AppDispatch = typeof store.dispatch; // Tipo do dispatch da store

// Exporta a store configurada
export default store;
