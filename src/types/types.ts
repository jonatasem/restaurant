// Define a estrutura dos dados do menu
export interface Menu {
    sections: Array<{
        id: number; // ID da seção
        name: string; // Nome da seção
        images: Array<{
            image: string; // Imagem da seção
        }>;
        items: Array<{
            id: number; // ID do item
            name: string; // Nome do item
            description: string; // Descrição do item
            price: number; // Preço do item
            images?: Array<{ id: number; image: string }>; // Imagens do item
            modifiers?: Array<{
                id: number; // ID do modificador
                name: string; // Nome do modificador
                minChoices: number; // Mínimo de escolhas
                maxChoices: number; // Máximo de escolhas
                items: Array<{
                    id: number; // ID da opção do modificador
                    name: string; // Nome da opção do modificador
                    price: number; // Preço da opção do modificador
                    maxChoices: number; // Máximo de escolhas para a opção
                    available: boolean; // Disponibilidade da opção
                }>;
            }>;
        }>;
    }>;
}

// Define a estrutura de um item no carrinho
export interface CartItem {
    id: number; // ID do item
    name: string; // Nome do item
    price: number; // Preço do item
    quantity: number; // Quantidade do item
    modifiers: Array<{
        id: number; // ID do modificador
        name: string; // Nome do modificador
        selectedItems: Array<string>; // Itens selecionados para este modificador
        items: Array<{ // Opções do modificador
            id: number; // ID da opção do modificador
            name: string; // Nome da opção do modificador
            price: number; // Preço da opção do modificador
            available: boolean; // Disponibilidade da opção
        }>;
    }>;
}

// Define a estrutura dos dados do restaurante 
export interface Restaurant {
    name: string; // Nome do restaurante
    webSettings: {
        bannerImage: string; // Imagem do banner
        backgroundColour: string; // Cor de fundo
        primaryColour: string; // Cor primária
        primaryColourHover: string; // Cor primária ao passar o mouse
        navBackgroundColour: string; // Cor de fundo da navegação
    };
    ccySymbol: string; // Símbolo da moeda
}
