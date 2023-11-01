import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import {
  ChainLink,
  EvolutionChain,
  PokemonDetailData,
  Species,
} from 'src/app/models/pokemon-data';
import { AppState } from 'src/app/store';

/**
 * PokemonDetailComponent is responsible for displaying detailed information about a Pokémon.
 */
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  /**
   * An observable that provides information about Pokémon evolutions.
   */
  public pokemonEvolutions$: Observable<EvolutionChain> = this.store.select(
    (state) => state.pokemonDetail,
  );

  /**
   * An observable that provides detailed information about a specific Pokémon.
   */
  public pokemonDetails$: Observable<PokemonDetailData | undefined> = this.store
    .select((state) => state.pokemon)
    .pipe(
      filter((x) => x !== null),
      map((allPokemon: PokemonDetailData[]): PokemonDetailData | undefined => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        return allPokemon.find((pokemon) => pokemon.id === id);
      }),
    );

  /**
   * An observable that combines Pokémon evolutions and details into a single object.
   */
  public pokemonAllDetails$ = combineLatest([
    this.pokemonEvolutions$,
    this.pokemonDetails$,
  ]).pipe(
    map(([pokemonEvolutions, pokemonDetails]) => {
      console.log('superfinal', {
        ...pokemonEvolutions,
        ...pokemonDetails,
        flat_evolution_chain: this.extractEvolutions(pokemonEvolutions?.chain),
      });
      return {
        ...pokemonEvolutions,
        ...pokemonDetails,
        flat_evolution_chain: this.extractEvolutions(pokemonEvolutions?.chain),
      };
    }),
  );

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {}

  /**
   * Extracts a list of Pokémon species from an evolution chain.
   * @param data - The evolution chain to extract species from.
   * @returns An array of Pokémon species.
   */
  public extractEvolutions(data: ChainLink | null): { species: Species }[] {
    if (!data) return [];
    let results: { species: Species }[] = [];

    if (data.evolves_to) {
      results.push({
        species: data.species,
      });
      for (const evolution of data.evolves_to) {
        results = results.concat(this.extractEvolutions(evolution));
      }
    }

    return results;
  }
}
