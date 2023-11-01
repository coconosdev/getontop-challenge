import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonDetailData } from '../models/pokemon-data';

const pokemonState = createFeatureSelector<{ pokemon: PokemonDetailData[] }>(
  'pokemonState',
);

export const pokemonSelectors = {
  pokemon: createSelector(pokemonState, (state) => state?.pokemon),
};
