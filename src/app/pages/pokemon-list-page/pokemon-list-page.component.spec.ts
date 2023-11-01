import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListPageComponent } from './pokemon-list-page.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { PokemonListComponent } from 'src/app/components/pokemon-list/pokemon-list.component';
import { DebugElement } from '@angular/core';
import * as PokemonActions from '../../store/actions';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { PAGE_SIZE } from 'src/app/globlal';
import { By } from '@angular/platform-browser';

describe('PokemonListPageComponent', () => {
  let component: PokemonListPageComponent;
  let fixture: ComponentFixture<PokemonListPageComponent>;
  let debugElement: DebugElement;
  let store: Store;

  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonListPageComponent,
        PaginatorComponent,
        PokemonListComponent,
      ],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: Store, useValue: mockStore }],
    });
    fixture = TestBed.createComponent(PokemonListPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.getAllPokemon.start({ limit: PAGE_SIZE }),
    );

    const pokemonDetailWrapper = debugElement.query(By.css('app-pokemon-list'));
    const paginatorELement = debugElement.query(By.css('app-paginator'));

    expect(pokemonDetailWrapper).toBeTruthy();
    expect(paginatorELement).toBeTruthy();
  });
});
