import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import {
  PokemonAPIResponse,
  PokemonDetailData,
  EvolutionChain,
} from '../models/pokemon-data';
import { of } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of Pokemon', () => {
    const mockResponse: PokemonAPIResponse = {
      count: 0,
      next: '',
      previous: '',
      results: [
        {
          name: 'Pikachu',
          url: '/',
        },
        {
          name: 'Charizard',
          url: '/',
        },
      ],
    };
    const limit = 151;
    const offset = 0;

    spyOn(service, 'getPokemon').and.returnValue(
      of(mockResponse.results as PokemonDetailData[]),
    );

    const result = service.getPokemon(limit, offset);
    expect(service.getPokemon).toHaveBeenCalledTimes(1);
    expect(service.getPokemon).toHaveBeenCalledWith(limit, offset);
    result.subscribe((res) => {
      expect(res).toEqual(mockResponse.results as PokemonDetailData[]);
    });
  });

  it('should fetch evolution details for a Pokemon', () => {
    const pokemonId = 1;
    const mockEvolutionDetails: EvolutionChain = {
      id: 1,
      baby_trigger_item: '',
      chain: {
        evolution_details: [],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: 7,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: '',
                trade_species: null,
                trigger: {
                  name: 'level-up',
                  url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
                },
                turn_upside_down: false,
              },
            ],
            evolves_to: [
              {
                evolution_details: [
                  {
                    gender: null,
                    held_item: null,
                    item: null,
                    known_move: null,
                    known_move_type: null,
                    location: null,
                    min_affection: null,
                    min_beauty: null,
                    min_happiness: null,
                    min_level: 10,
                    needs_overworld_rain: false,
                    party_species: null,
                    party_type: null,
                    relative_physical_stats: null,
                    time_of_day: '',
                    trade_species: null,
                    trigger: {
                      name: 'level-up',
                      url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
                    },
                    turn_upside_down: false,
                  },
                ],
                evolves_to: [],
                is_baby: false,
                species: {
                  name: 'butterfree',
                  url: 'https://pokeapi.co/api/v2/pokemon-species/12/',
                },
              },
            ],
            is_baby: false,
            species: {
              name: 'metapod',
              url: 'https://pokeapi.co/api/v2/pokemon-species/11/',
            },
          },
        ],
        is_baby: false,
        species: {
          name: 'caterpie',
          url: 'https://pokeapi.co/api/v2/pokemon-species/10/',
        },
      },
    };

    service
      .getPokemonEvolutionDetails(pokemonId)
      .subscribe((data: EvolutionChain) => {
        expect(data).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      `${service.evolutionURL}/${pokemonId}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEvolutionDetails);
  });
});
