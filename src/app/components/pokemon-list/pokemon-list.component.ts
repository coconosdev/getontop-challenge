import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

/**
 * PokemonListComponent is responsible for displaying a list of Pokémon.
 */
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  /**
   * An observable that provides a list of Pokémon to be displayed.
   */
  pokemonList$ = this.store.select((state) => state?.pokemon);

  constructor(private store: Store<AppState>) {}
}
