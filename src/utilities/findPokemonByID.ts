import { PokemonAPI } from "@/models/fetchPokemonAPI";

export const findPokemonByID = (id: number, pokemonArray: PokemonAPI[]):boolean => {
    return !!pokemonArray.find((p) => {
        return p.id === id  
    })
}