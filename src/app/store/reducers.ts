import { createReducer, on } from '@ngrx/store';
import * as PokemonActions from './actions';
import { EvolutionChain, PokemonDetailData } from '../models/pokemon-data';

export const initialState: PokemonDetailData[] = [];
export const initialDetailState: EvolutionChain = {
  id: 0,
  baby_trigger_item: '',
  chain: null,
};

export const allPokemonReducer = createReducer(
  initialState,
  on(PokemonActions.getAllPokemon.request, () => {
    return null as unknown as PokemonDetailData[];
  }),
  on(PokemonActions.getAllPokemon.response, (state, { payload }) => {
    return [...payload];
  }),
  on(PokemonActions.getAllPokemon.error, () => {
    return [{ error: true }] as unknown as PokemonDetailData[];
  }),
);

export const pokemonDetailReducer = createReducer(
  initialDetailState,
  on(PokemonActions.getEvolutionChainById.response, (state, { payload }) => {
    return { ...payload };
  }),
  on(PokemonActions.getEvolutionChainById.error, () => {
    return { error: true } as unknown as EvolutionChain;
  }),
);
