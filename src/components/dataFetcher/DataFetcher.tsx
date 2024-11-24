import React, { useEffect, useState } from 'react';
import { fetchRestaurantDetails, fetchMenuDetails } from '../../services/api';
import { Restaurant, Menu } from '../../types/types'; // Importando as interfaces

// Interface para as propriedades do componente DataFetcher
interface DataFetcherProps {
    onFetch: (restaurant: Restaurant | null, menu: Menu | null, error: string | null) => void; // Função de callback para retornar os dados buscados
}

// Componente DataFetcher que busca dados do restaurante e do menu
const DataFetcher: React.FC<DataFetcherProps> = ({ onFetch }) => {
    const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

    useEffect(() => {
        // Função assíncrona para buscar os dados
        const fetchData = async () => {
            try {
                const restaurantResponse = await fetchRestaurantDetails(); // Busca detalhes do restaurante
                const menuResponse = await fetchMenuDetails(); // Busca detalhes do menu
                onFetch(restaurantResponse, menuResponse, null); // Chama a função de callback com os dados
            } catch (error) {
                setError('Erro ao buscar dados. Tente novamente mais tarde.'); // Atualiza o estado de erro
                console.error('Erro ao buscar dados:', error); // Loga o erro no console
                onFetch(null, null, 'Erro ao buscar dados. Tente novamente mais tarde.'); // Chama a função de callback com erro
            }
        };        
        fetchData(); // Executa a função de busca
    }, [onFetch, error]);

    return null; // O componente não renderiza nada, apenas busca dados
};

export default DataFetcher;