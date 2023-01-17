import { PokemonAPI } from "@/models/fetchPokemonAPI";
import { LocalStorageTypes } from "@/models/localStorage";
import { SelectedPokemon } from "@/models/selectedPokemon";
import { getLocalStorage, setLocalStorage } from "@/utilities/localStorage.utility";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PokemonAPI[] = [];

export const findPokemon = ( pokemon: SelectedPokemon | PokemonAPI, pokemonArray: PokemonAPI[]):boolean => {
    return(
        !!pokemonArray.find((p:PokemonAPI) => {
            return ( 
                pokemon.id === p.id || pokemon.name === p.name
            ) 
        })
    )
};

export const filterPokemon = ( pokemon: SelectedPokemon | PokemonAPI, pokemonArray: PokemonAPI[]):PokemonAPI[] => {
    return(
        pokemonArray.filter((p:PokemonAPI) => {
            return ( 
                pokemon.id !== p.id || pokemon.name !== p.name
            ) 
        })
    )
;} 

export const favoriteSlice = createSlice({
    name: LocalStorageTypes.FAVORITE_POKEMONS,
    initialState: getLocalStorage(LocalStorageTypes.FAVORITE_POKEMONS) ? JSON.parse(localStorage.getItem(LocalStorageTypes.FAVORITE_POKEMONS) as string) : initialState,
    reducers: {
        addFavorite: (state, actions):PokemonAPI[] => {
            const newState: PokemonAPI[] = [...state, actions.payload];
            setLocalStorage(LocalStorageTypes.FAVORITE_POKEMONS, newState);
            return newState;
            
        },
        removeFavorite: (state, actions):PokemonAPI[] => {
            const newState: PokemonAPI[] = filterPokemon(actions.payload, state);
            setLocalStorage(LocalStorageTypes.FAVORITE_POKEMONS, newState);
            return newState;
        }
    }
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;

// addFavorite: (state, actions):PokemonAPI[] => {
//     if(findPokemon(actions.payload, state)) {
//         return state;
//     }
//     else {
//         const newState:PokemonAPI[] = [...state, actions.payload];
//         setLocalStorage(LocalStorageTypes.FAVORITE_POKEMONS, newState);
//         return newState;
//     } 
// },
// removeFavorite: (state, actions):PokemonAPI[] => {
//     if(findPokemon(actions.payload, state)) {
//         const newState: PokemonAPI[] = filterPokemon(actions.payload, state);
//         setLocalStorage(LocalStorageTypes.FAVORITE_POKEMONS, newState);
//         return newState;
//     }
//     else return state;
// }