/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DivideByTenPipe } from 'src/app/pipes/divide-by-ten.pipe';
import { PokemonDetailData, Species } from 'src/app/models/pokemon-data';

const chainMock = {
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
};

describe('PokemonDetailComponent', () => {
  let component: PokemonDetailComponent;
  let fixture: ComponentFixture<PokemonDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent, DivideByTenPipe],
      providers: [
        Store,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
      imports: [StoreModule.forRoot({})],
    });
    fixture = TestBed.createComponent(PokemonDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract evolutions', () => {
    const expectedEvolutions: { species: Species }[] = [
      {
        species: {
          name: 'caterpie',
          url: 'https://pokeapi.co/api/v2/pokemon-species/10/',
        },
      },
      {
        species: {
          name: 'metapod',
          url: 'https://pokeapi.co/api/v2/pokemon-species/11/',
        },
      },
      {
        species: {
          name: 'butterfree',
          url: 'https://pokeapi.co/api/v2/pokemon-species/12/',
        },
      },
    ];
    const actualEvolutions = component.extractEvolutions(chainMock);
    expect(actualEvolutions).toEqual(expectedEvolutions);
  });

  it('should combine and map observables for pokemonAllDetails$', () => {
    const mockPokemonEvolutions = {
      id: 1,
      baby_trigger_item: '',
      chain: chainMock,
    };
    const mockPokemonDetails = {
      name: 'Pikachu',
      url: '/1',
    };
    component.pokemonEvolutions$ = of(mockPokemonEvolutions);
    component.pokemonDetails$ = of(mockPokemonDetails as PokemonDetailData);
    component.pokemonAllDetails$ = of({
      ...mockPokemonEvolutions,
      ...mockPokemonDetails,
    } as unknown as any);

    component.pokemonAllDetails$.subscribe((actualCombinedDetails) => {
      expect(actualCombinedDetails.chain).toEqual(mockPokemonEvolutions.chain);
      expect(actualCombinedDetails.name).toEqual(mockPokemonDetails.name);
    });
  });
});
