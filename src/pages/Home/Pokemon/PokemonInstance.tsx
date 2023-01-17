import React, { useEffect } from 'react';
import { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography} from '@mui/material'
import {ArrowBackIos, ArrowForwardIos, CatchingPokemonTwoTone} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Appstore } from '@/redux/store';
import { getPokemonData } from '@/axios/utils/getPokemonData';
import { PokemonAPI, StatAPI } from '@/models/fetchPokemonAPI';
import { addPokemon } from '@/redux/states/pokemon';
import { changeSelectedPokemon } from '@/redux/states/selectedPokemon';
import { SelectedPokemon } from '@/models/selectedPokemon';
import { findPokemonByID } from '@/utilities/findPokemonByID';
import { addFavorite, findPokemon, removeFavorite } from '@/redux/states/favorites';

export interface PokemonInstanceInterface {};

const PokemonInstance : React.FC<PokemonInstanceInterface> = () => {

	const pokemonState = useSelector((store: Appstore) => store.pokemon);
	const favoritesState = useSelector((store: Appstore) => store.favorites)
	const selectedPokemonState = useSelector((store: Appstore) => store.selectedPokemon);
	const dispatch = useDispatch();
	const POKE_MAX_AMOUNT = 1500;

	const previousIdHandler = () => {
		if(selectedPokemonState.id > 1) {
			const newSelectedPokemon: SelectedPokemon = {
				id: selectedPokemonState.id -1,
				name: '',
				url: ''
			}
			dispatch(changeSelectedPokemon(newSelectedPokemon));
		}
		else {
			alert("Ponte un pare mi hermano, deja la intensidad!")
		}
	};
	const nextIdHandler = () => {
		if(selectedPokemonState.id < POKE_MAX_AMOUNT) {
			const newSelectedPokemon: SelectedPokemon = {
				id: selectedPokemonState.id +1,
				name: '',
				url: ''
			}
			dispatch(changeSelectedPokemon(newSelectedPokemon));
		}
		else {
			alert("Esta pokedex solo admite 20 pokemones, problemas tercermundistas espero pueda entender :(")
		}
	}
	const favoriteHandler = () => {
		if(findPokemon(selectedPokemonState, favoritesState)) {
			alert(`Ha removido exitosamente a ${pokemonState.name} de su lista de favoritos!`)
			dispatch(removeFavorite(pokemonState));
		}
		else {
			alert(`Uds ha añadido a ${pokemonState.name} su lista de favoritos!`);
			dispatch(addFavorite(pokemonState));
		}
	}
	
	useEffect(() => { 
		
		getPokemonData(selectedPokemonState.id)
		.then((res) => dispatch(addPokemon(res)))
		.then(() => { //no cumple ninguna funcion
			if(selectedPokemonState.id !== pokemonState.id || selectedPokemonState.name !== pokemonState.name) {
				console.log("No renderizamos");
			}
			else {
				dispatch(changeSelectedPokemon({
					...selectedPokemonState,
					id: pokemonState.id,
					name: pokemonState.name,
					url:  `https://pokeapi.co/api/v2/${pokemonState.id}`
				}))
				console.log(pokemonState);
			}
		})
		.catch((err) => console.log(err))

	}, [selectedPokemonState.id, selectedPokemonState.name])
	

	return (
		<Card variant="outlined" sx = {{ width: 500}}>
			<Card variant="outlined" sx={{marginBottom: 2}}>
					<Grid
					sx={{height : "60px"}}
					container
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					>
					<Grid item xs = {3}>
						<Typography variant='body2'>
							{`name: ${pokemonState.name.toUpperCase()}`}
						</Typography>
					</Grid>
					<Grid item xs = {3} container direction="column" spacing={0.5} >
						{
							pokemonState.types.map((a:string, index: number)=> {
							return (
									<Grid item xs = {4} key={index}>
										<Typography variant='body2'  key={index} >
											{a}
										</Typography>
									</Grid>
							)
						})	
						}
					</Grid>
					<Grid item xs = {2}>
						<IconButton aria-label="add to favorites" onClick={favoriteHandler}>
		 					<CatchingPokemonTwoTone fontSize='large' color="error" />
		 				</IconButton>
					</Grid>
				</Grid>
			</Card>
			<CardMedia 
				component="img"
				image = {pokemonState.sprites}
				height= "200px"
				sx={{ width: "100%", objectFit: "contain"}}
				alt = {pokemonState.name + ' foto'}
			/>
			<CardContent>
				<Typography variant="body1"	color="text-secondary">
					STATS:
				</Typography>
				<Grid 
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="center"
				>
					{
						pokemonState.stats.map((a:StatAPI, index:number)=> {
						return (
								<Grid item xs = {4} key = {index}>
									<Typography variant='body2'>
										{`${a.name}: ${a.base_stat}`}
									</Typography>
								</Grid>
							)
						})	
						}
				</Grid>
			</CardContent>
			<CardActions disableSpacing>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<IconButton aria-label='previous pokemon' onClick={previousIdHandler}>
							<ArrowBackIos />
						</IconButton>
					</Grid>
					<Grid item xs = {6}>
						<Typography variant="body1"> 
							{selectedPokemonState.id} 
						</Typography>
					</Grid>
					<Grid item xs = {3}>
						<IconButton aria-label='next pokemon' onClick={nextIdHandler}>
							<ArrowForwardIos   />
						</IconButton>
					</Grid>
				</Grid>
			</CardActions>	
		</Card>
	)
};

export default PokemonInstance;

	// const findPokemonById = (id: number) => {
	// 	return pokemonState.find((p)=> {
	// 		return p.id === id;
	// 	});
	// }`

	// <CardHeader
	// 			avatar = {
	// 				<IconButton aria-label="add to favorites">
	// 					<CatchingPokemonTwoTone fontSize='large' color="error" />
	// 				</IconButton>
	// 			}
	// 			action = {
	// 				<IconButton aria-label="add to favorites">
	// 					<CatchingPokemonTwoTone fontSize='large' color="error" />
	// 				</IconButton>
	// 			}
	// 			title= {pokemonState.name}
	// 			subheader="generation X"
	// 		/>

	// .then(() => dispatch(changeSelectedPokemon({
	// 	...selectedPokemonState,
	// 	id: pokemonState.id,
	// 	name: pokemonState.name,
	// 	url:  `https://pokeapi.co/api/v2/${pokemonState.id}`
	// })))