import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import {
  EvolutionChain,
  PokemonAPIResponse,
  PokemonBasicData,
  PokemonDetailData,
  SpeciesDetail,
} from '../models/pokemon-data';

/**
 * PokemonService is responsible for fetching Pokémon data from the PokeAPI.
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /**
   * The base URL for Pokémon data in the PokeAPI.
   */
  public URL = 'https://pokeapi.co/api/v2/pokemon';
  /**
   * The URL for fetching Pokémon evolution chain data.
   */
  public evolutionURL = 'https://pokeapi.co/api/v2/evolution-chain';
  /**
   * The URL for fetching Pokémon species data.
   */
  public speciesURL = 'https://pokeapi.co/api/v2/pokemon-species';

  constructor(private http: HttpClient) {}

  /**
   * Fetch a list of Pokémon with optional limit and offset parameters.
   * @param limit - The maximum number of Pokémon to retrieve.
   * @param offset - The starting point for retrieving Pokémon.
   * @returns An observable that emits an array of Pokémon details.
   */
  getPokemon(limit?: number, offset?: number): Observable<PokemonDetailData[]> {
    const params = new HttpParams()
      .append('limit', limit ?? '')
      .append('offset', offset ?? '');

    return this.http
      .get<PokemonAPIResponse>(this.URL, {
        params,
      })
      .pipe(
        mergeMap((response: PokemonAPIResponse) => {
          const pokemonRequests: Observable<PokemonDetailData>[] =
            response.results.map((pokemon: PokemonBasicData) =>
              this.http.get<PokemonDetailData>(pokemon.url),
            );
          return forkJoin(pokemonRequests);
        }),
      );
  }

  /**
   * Fetch evolution details for a specific Pokémon.
   * @param pokemonId - The unique ID of the Pokémon for which to retrieve evolution details.
   * @returns An observable that emits the Pokémon's evolution chain information.
   */
  getPokemonEvolutionDetails(pokemonId: number): Observable<EvolutionChain> {
    return this.http
      .get<SpeciesDetail>(`${this.speciesURL}/${pokemonId}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .pipe(
        mergeMap((response: SpeciesDetail) => {
          return this.http.get<EvolutionChain>(response.evolution_chain.url);
        }),
      );
  }
}
