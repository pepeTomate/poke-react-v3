import { PokemonAPI } from "@/models/fetchPokemonAPI";
import { LocalStorageTypes } from "@/models/localStorage";
import { getLocalStorage, setLocalStorage } from "@/utilities/localStorage.utility";
import { createSlice } from "@reduxjs/toolkit";


let initialState:PokemonAPI = {
    id: 1,
    name: '',
    abilities: [],
    types: [],
    sprites: '',
    species: '',
    stats: []
};

export const pokemonSlice = createSlice({
    name: LocalStorageTypes.POKEMON,
    initialState: getLocalStorage(LocalStorageTypes.POKEMON) ? JSON.parse(localStorage.getItem(LocalStorageTypes.POKEMON) as string) : initialState,
    reducers: {
        addPokemon: (state, actions) => {
                setLocalStorage(LocalStorageTypes.POKEMON, actions.payload);
                return actions.payload; 
        }    
    }
});

export const {addPokemon} = pokemonSlice.actions;