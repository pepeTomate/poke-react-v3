export interface PokemonAPI {
    id: number;
    name: string;
    abilities: string[];
    types: string[];
    sprites: string;
    species: string;
    stats: StatAPI[]
};

export interface StatAPI {
    name: string,
    base_stat: number
}