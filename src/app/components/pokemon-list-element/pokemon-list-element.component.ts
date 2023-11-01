import { Component, Input } from '@angular/core';
import { PokemonDetailData } from 'src/app/models/pokemon-data';

/**
 * PokemonListElementComponent is responsible for rendering a single Pokémon list element.
 */
@Component({
  selector: 'app-pokemon-list-element',
  templateUrl: './pokemon-list-element.component.html',
  styleUrls: ['./pokemon-list-element.component.scss'],
})
export class PokemonListElementComponent {
  /**
   * The Pokémon data to be displayed in the element. Can be `null` if no data is available.
   */
  @Input() pokemon: PokemonDetailData | null = null;
}
