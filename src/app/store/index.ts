import { ActionReducerMap } from '@ngrx/store';
import * as pokemonReducer from './reducers';
import { EvolutionChain, PokemonDetailData } from '../models/pokemon-data';

export interface AppState {
  pokemon: PokemonDetailData[];
  pokemonDetail: EvolutionChain;
}

export const reducers: ActionReducerMap<AppState> = {
  pokemon: pokemonReducer.allPokemonReducer,
  pokemonDetail: pokemonReducer.pokemonDetailReducer,
};
