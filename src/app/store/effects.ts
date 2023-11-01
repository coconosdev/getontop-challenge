import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PokemonActions from './actions';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
  ) {}

  public getAllPokemon$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(PokemonActions.getAllPokemon.start),
        switchMap(({ payload }) =>
          this.pokemonService.getPokemon(payload.limit, payload.offset).pipe(
            map((data) => PokemonActions.getAllPokemon.response(data)),
            catchError((err) => of(PokemonActions.getAllPokemon.error(err))),
            startWith(PokemonActions.getAllPokemon.request()),
          ),
        ),
      ),
  );

  public getEvolutionsByPokemon = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(PokemonActions.getEvolutionChainById.start),
        switchMap(({ payload }) =>
          this.pokemonService.getPokemonEvolutionDetails(payload.id).pipe(
            map((data) => PokemonActions.getEvolutionChainById.response(data)),
            catchError((err) =>
              of(PokemonActions.getEvolutionChainById.error(err)),
            ),
            startWith(PokemonActions.getEvolutionChainById.request()),
          ),
        ),
      ),
  );
}
