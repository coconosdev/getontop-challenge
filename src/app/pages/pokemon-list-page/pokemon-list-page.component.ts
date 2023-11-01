import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as PokemonActions from 'src/app/store/actions';
import { PAGE_SIZE } from 'src/app/globlal';

/**
 * PokemonListPageComponent is responsible for displaying a list of Pokémon.
 */
@Component({
  selector: 'app-pokemon-list-page',
  templateUrl: './pokemon-list-page.component.html',
})
export class PokemonListPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  /**
   * Initializes the component and dispatches the action that retrieves the initial list of Pokémon.
   */
  ngOnInit() {
    this.store.dispatch(
      PokemonActions.getAllPokemon.start({ limit: PAGE_SIZE }),
    );
  }
}
