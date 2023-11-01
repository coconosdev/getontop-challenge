import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailPageComponent } from './pokemon-detail-page.component';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import * as PokemonActions from '../../store/actions';
import { PAGE_SIZE } from 'src/app/globlal';
import { PokemonDetailComponent } from 'src/app/components/pokemon-detail/pokemon-detail.component';
import { DivideByTenPipe } from 'src/app/pipes/divide-by-ten.pipe';
import { By } from '@angular/platform-browser';

describe('PokemonDetailPageComponent', () => {
  let component: PokemonDetailPageComponent;
  let fixture: ComponentFixture<PokemonDetailPageComponent>;
  let debugElement: DebugElement;
  let store: Store;

  const mockStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: () => of([]),
  };

  const mockRoute = {
    snapshot: {
      paramMap: {
        get: () => '1',
      },
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PokemonDetailPageComponent,
        PokemonDetailComponent,
        DivideByTenPipe,
      ],
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });
    fixture = TestBed.createComponent(PokemonDetailPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions and subscribe to the store', () => {
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.getEvolutionChainById.start({ id: 1 }),
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.getAllPokemon.start({ limit: PAGE_SIZE }),
    );

    const pokemonDetailWrapper = debugElement.query(
      By.css('app-pokemon-detail'),
    );
    expect(pokemonDetailWrapper).toBeTruthy();
  });

  it('should unsubscribe when destroyed', () => {
    const unsubscribeSpy = spyOn(component['unsubscribe$'], 'next');
    const completeSpy = spyOn(component['unsubscribe$'], 'complete');

    fixture.detectChanges();
    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
