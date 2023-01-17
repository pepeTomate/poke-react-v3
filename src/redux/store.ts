import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./states/pokemon";
import { favoriteSlice } from "./states/favorites";
import { PokemonAPI } from "@/models/fetchPokemonAPI";
import { SelectedPokemon } from "@/models/selectedPokemon";
import { selectedPokemonSlice } from "./states/selectedPokemon";

export interface Appstore {
    pokemon: PokemonAPI;
    favorites: PokemonAPI[];
    selectedPokemon: SelectedPokemon;
}

export default configureStore<Appstore>({
    reducer: {
        pokemon: pokemonSlice.reducer,
        favorites: favoriteSlice.reducer,
        selectedPokemon: selectedPokemonSlice.reducer
    }
})