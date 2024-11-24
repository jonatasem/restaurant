import { useEffect, useState } from 'react';
import { Restaurant, Menu } from '../types/types';

const useFetchRestaurant = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menu, setMenu] = useState<Menu | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Função para atualizar os estados com os dados buscados.
    const handleFetch = (fetchedRestaurant: Restaurant | null, fetchedMenu: Menu | null, fetchError: string | null) => {
        setRestaurant(fetchedRestaurant);
        setMenu(fetchedMenu);
        setError(fetchError);
    };

    // Retornando os dados do restaurante, menu, erro e a função de busca.
    return { restaurant, menu, error, handleFetch };
};

export default useFetchRestaurant;
