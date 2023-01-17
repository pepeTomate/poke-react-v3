import { PokemonAPI } from "@/models/fetchPokemonAPI";
import { Pokemon } from "@/models/pokemon";
import { SelectedPokemon } from "@/models/selectedPokemon";

export const setLocalStorage = (type: string, data: PokemonAPI | SelectedPokemon | PokemonAPI []) => {
    return localStorage.setItem(type, JSON.stringify(data))
}

export const getLocalStorage = (type: string) => {
    return !!localStorage.getItem(type);
}