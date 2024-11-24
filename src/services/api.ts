import axios from 'axios';

// Define a URL base para as requisições à API
const BASE_URL = 'https://proxy-server-2r73.onrender.com/api';

// Função para buscar detalhes do restaurante
export const fetchRestaurantDetails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/venue`); // Faz uma requisição GET para buscar os detalhes do restaurante
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar detalhes do restaurante:', error); // Loga o erro no console
        throw error; // Lança o erro para ser tratado em outro lugar
    }
};

// Função para buscar detalhes do menu
export const fetchMenuDetails = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/menu`); // Faz uma requisição GET para buscar os detalhes do menu
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar detalhes do menu:', error); // Loga o erro no console
        throw error; // Lança o erro para ser tratado em outro lugar
    }
};