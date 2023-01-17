import { LocalStorageTypes } from "@/models/localStorage";
import { SelectedPokemon } from "@/models/selectedPokemon";
import { getLocalStorage, setLocalStorage } from "@/utilities/localStorage.utility";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SelectedPokemon = {
    name: 'bulbasaur',
    id: 1,
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
}

export const selectedPokemonSlice =  createSlice({
    name: LocalStorageTypes.SELECTED_POKEMON, 
    initialState: getLocalStorage(LocalStorageTypes.SELECTED_POKEMON) ? JSON.parse(localStorage.getItem(LocalStorageTypes.SELECTED_POKEMON) as string) :initialState,
    reducers: {
        changeSelectedPokemon: (state, actions):SelectedPokemon => {
            setLocalStorage(LocalStorageTypes.SELECTED_POKEMON, actions.payload);
            return actions.payload;
        }
    }

});

export const { changeSelectedPokemon } = selectedPokemonSlice.actions; 