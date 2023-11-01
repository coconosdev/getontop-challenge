import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as PokemonActions from 'src/app/store/actions';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let store: Store<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
      providers: [Store],
      imports: [StoreModule.forRoot({})],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if offset is to low, it should not change', () => {
    component.offset = 30;
    component.previousPage();
    expect(component.offset).toBe(30);

    spyOn(store, 'dispatch');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('if offset is to high, it should not change', () => {
    component.offset = 1400;
    component.nextPage();
    expect(component.offset).toBe(1400);

    spyOn(store, 'dispatch');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should decrease offset and dispatch event on previousPage', () => {
    component.offset = 300;
    component.previousPage();
    expect(component.offset).toBe(149);

    spyOn(store, 'dispatch');
    component.dispatchEvent();
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.getAllPokemon.start({
        limit: component.limit,
        offset: component.offset,
      }),
    );
  });

  it('should increase offset and dispatch event on nextPage', () => {
    component.offset = 200;
    component.nextPage();
    expect(component.offset).toBe(351);

    spyOn(store, 'dispatch');
    component.dispatchEvent();
    expect(store.dispatch).toHaveBeenCalledWith(
      PokemonActions.getAllPokemon.start({
        limit: component.limit,
        offset: component.offset,
      }),
    );
  });
});
