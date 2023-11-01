import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/store';
import * as PokemonActions from 'src/app/store/actions';
import { PAGE_SIZE } from 'src/app/globlal';
import { PokemonDetailData } from 'src/app/models/pokemon-data';

/**
 * PokemonDetailPageComponent is responsible for displaying detailed information about a Pokémon.
 */
@Component({
  selector: 'app-pokemon-detail-page',
  templateUrl: './pokemon-detail-page.component.html',
})
export class PokemonDetailPageComponent implements OnInit, OnDestroy {
  /**
   * A subject used to unsubscribe from observables when the component is destroyed.
   */
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  /**
   * Initializes the component. Retrieves and displays Pokémon details and their evolution chain.
   */
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(PokemonActions.getEvolutionChainById.start({ id }));

    this.store
      .select((state) => state.pokemon)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((allPokemon: PokemonDetailData[]) => {
          if (!allPokemon || allPokemon.length === 0) {
            this.store.dispatch(
              PokemonActions.getAllPokemon.start({ limit: PAGE_SIZE }),
            );
          }
        }),
      )
      .subscribe();
  }

  /**
   * Unsubscribe from observables to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
