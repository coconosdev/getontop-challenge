import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PokemonDetailData } from 'src/app/models/pokemon-data';
import { Store, StoreModule } from '@ngrx/store';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { PokemonListElementComponent } from '../pokemon-list-element/pokemon-list-element.component';
import { RouterModule } from '@angular/router';

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonListComponent,
        LoadingIndicatorComponent,
        PokemonListElementComponent,
      ],
      providers: [Store],
      imports: [StoreModule.forRoot({}), RouterModule.forRoot([])],
    });
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list when data is available', () => {
    const pokemonList = [
      { id: 1, name: 'Pikachu' },
      { id: 2, name: 'Charizard' },
    ] as PokemonDetailData[];

    const store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(pokemonList));
    component.pokemonList$ = of(pokemonList);

    fixture.detectChanges();

    const listElements = debugElement.queryAll(
      By.css('.pokemon-list-wrapper app-pokemon-list-element'),
    );
    expect(listElements.length).toBe(2);
  });

  it('should render the loading indicator when data is not available', () => {
    component.pokemonList$ = of(null as unknown as PokemonDetailData[]);
    fixture.detectChanges();

    const loadingIndicator = debugElement.query(
      By.css('app-loading-indicator'),
    );
    expect(loadingIndicator).toBeTruthy();
  });
});
