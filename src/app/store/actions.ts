import { createAction } from '@ngrx/store';
import { EvolutionChain, PokemonDetailData } from '../models/pokemon-data';
import { HttpErrorResponse } from '@angular/common/http';

export const getAllPokemon = {
  start: createAction(
    'Pokemon - Get All Pokemon - Start',
    (options: { limit?: number; offset?: number }) => ({
      payload: options,
    }),
  ),
  clear: createAction('Pokemon - Get All Pokemon - Clear'),
  request: createAction('Pokemon - Get All Pokemon - Request'),
  response: createAction(
    'Pokemon - Get All Pokemon - Response',
    (response: PokemonDetailData[]) => ({
      payload: response,
    }),
  ),
  error: createAction(
    'Pokemon - Get All Pokemon - Error',
    (error: HttpErrorResponse) => ({
      payload: error,
    }),
  ),
};

export const getEvolutionChainById = {
  start: createAction(
    'Pokemon - Get Evolution - Start',
    (options: { id: number }) => ({
      payload: options,
    }),
  ),
  clear: createAction('Pokemon - Get Evolution - Clear'),
  request: createAction('Pokemon - Get Evolution - Request'),
  response: createAction(
    'Pokemon - Get Evolution - Response',
    (response: EvolutionChain) => ({
      payload: response,
    }),
  ),
  error: createAction(
    'Pokemon - Get Evolution - Error',
    (error: HttpErrorResponse) => ({
      payload: error,
    }),
  ),
};
