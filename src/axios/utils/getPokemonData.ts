import { PokemonAPI, StatAPI } from "@/models/fetchPokemonAPI";
import { client } from "../api/client";
import { useState } from "react";

export const getPokemonData = async(req: string | number): Promise<PokemonAPI> => {
    let newState:PokemonAPI = {
        id: 0,
        name: '',
        abilities: [],
        types: [],
        sprites: '',
        species: '',
        stats: []
    }
    let abilityAux:string[] = [];
    let typesAux:string[] = [];
    let statsAux:StatAPI[] = [];

    const { data } = await client.get(`/pokemon/${req}`);

    data.abilities.map((a:any)=> {
        abilityAux = abilityAux.concat(a.ability.name);
    })
    data.types.map((t:any)=> {
        typesAux = typesAux.concat(t.type.name);
    })
    data.stats.map((s:any)=> {
        const { base_stat, stat} = s;
        const newStat:StatAPI = {
            base_stat: base_stat,
            name: stat.name
        }
        statsAux = statsAux.concat(newStat);
    })

    newState = {
        ...newState,
        id: data.id,
        name: data.name,
        species: data.species.url,
        sprites: data.sprites.other.dream_world.front_default,
        abilities: abilityAux,
        types: typesAux,
        stats: statsAux
    }
    console.log(newState);
    return newState;
}