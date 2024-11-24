import { useEffect, useState } from 'react';
import { Menu } from '../types/types';

// Hook personalizado para gerenciar seções visíveis de um menu.
const useVisibleSections = (menu: Menu | null) => {
    const [visibleSections, setVisibleSections] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (menu) {
            const initialVisibleSections = menu.sections.reduce((acc, section) => {
                acc[section.id] = true; // Define todas as seções como visíveis por padrão
                return acc;
            }, {} as { [key: number]: boolean });
            setVisibleSections(initialVisibleSections);
        }
    }, [menu]);

    // Função para alternar a visibilidade de uma seção específica.
    const toggleSectionVisibility = (sectionId: number) => {
        setVisibleSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId] // Inverte a visibilidade da seção
        }));
    };

    return { visibleSections, toggleSectionVisibility };
};

export default useVisibleSections;