import React, { useEffect, useState } from 'react';
import PokemonInstance from './Pokemon/PokemonInstance';
import { Box, Container } from '@mui/material';

export interface HomeInterface {}


const Home : React.FC<HomeInterface> = () => {
	return (
			<Box margin={5} padding={0}>
				<PokemonInstance/>
			</Box>
	)
};

export default Home;


// let pokemonState: Pokemon = {
// 	id: 0,
// 	name: '',
// 	form_descriptions: '',
// 	generation: '',
// 	sprites: ''
// 	}

// const fetchPokemonList = () => {
// 	fetch('https://pokeapi.co/api/v2/pokemon?list=20')
// 	.then(response => response.json())
// 	.then((allPokemon) => {
// 		allPokemon.results.forEach((pokemonItem:any) => {
// 			fetchPokemonData(pokemonItem);
// 		})
// 	})
// };

// const fetchPokemonData = (pokemonItem: any) => {
// 	let url = pokemonItem.url;
// 	fetch(url)
// 	.then(response => response.json())
// 	.then((pokemonData) => {
// 		const {id, name, sprites } = pokemonData;
// 		pokemonState = {
// 			...pokemonState,
// 			id: id,
// 			name: name,
// 			sprites: sprites.other.dream_world.front_default
// 		}
// 		//console.log(pokemonState);
// 		pokeList = [...pokeList, pokemonState];
// 		setLocalStorage(LocalStorageTypes.POKEMON, pokeList);
// 	})
// };
