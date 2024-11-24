import { useState } from 'react';

// Hook personalizado para gerenciar a busca.
const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Atualiza o termo de busca conforme o usuário digita.
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return { searchTerm, handleSearchChange }; // Retorna o termo de busca e a função para atualizar
};

export default useSearch;