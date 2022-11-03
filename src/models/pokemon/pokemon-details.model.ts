export interface PokemonDetails {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: PokemonSprites;
    flavorTexts: FlavorTextEntry[];
}

export interface PokemonType {
    type: {
        name: string;
        url: string;
    }
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
}

export interface FlavorTextEntry {
    flavorText: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}