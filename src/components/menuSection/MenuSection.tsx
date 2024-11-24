import React from 'react';
import './MenuSection.css';
import { Menu } from '../../types/types'; // Importando Menu para usar as interfaces

// Componente MenuSection que exibe uma seção do menu
interface MenuSectionProps {
    section: Menu['sections'][number]; // Tipo da seção do menu
    primaryColour: string; // Cor primária para estilização
}

const MenuSection: React.FC<MenuSectionProps> = ({ section, primaryColour }) => {
    // Verifica se a seção atual é a ativa
    const isActive = section.id === 242403;

    return (
        <section className='menu-section' key={section.id}>
            <article className='container-layout'>
                <div className='list-image'>
                    {section.images.length > 0 ? (
                        section.images.map((img, index) => (
                            <div className='image-container' key={index}>
                                <img 
                                    src={img.image} 
                                    alt={section.name} 
                                    className={isActive ? 'img-active' : ''} // Aplica img-active se isActive for true
                                    style={{
                                        border: isActive ? `2px solid ${primaryColour}` : 'none' // Aplica borda se a seção estiver ativa
                                    }}
                                />
                                <h2 
                                    className={isActive ? 'title-active' : ''} // Aplica title-active se isActive for true
                                    style={{ color: isActive ? primaryColour : 'inherit' }} // Aplica cor primária se a seção estiver ativa
                                >
                                    {section.name}
                                </h2>
                            </div>
                        ))
                    ) : (
                        <p>No image available</p> // Mensagem caso não haja imagem
                    )}
                </div>
            </article>
        </section>
    );
};

export default MenuSection;
