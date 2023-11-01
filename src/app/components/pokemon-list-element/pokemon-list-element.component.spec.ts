import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListElementComponent } from './pokemon-list-element.component';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PokemonDetailData } from 'src/app/models/pokemon-data';

describe('PokemonListElementComponent', () => {
  let component: PokemonListElementComponent;
  let fixture: ComponentFixture<PokemonListElementComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListElementComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(PokemonListElementComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Pokemon details', () => {
    const mockPokemon = {
      id: 1,
      name: 'pikachu',
      sprites: { front_default: 'pikachu.png' },
    } as PokemonDetailData;
    component.pokemon = mockPokemon;
    fixture.detectChanges();

    const pokemonWrapper = debugElement.query(By.css('.pokemon-list-wrapper'));
    expect(pokemonWrapper).toBeTruthy();

    const spriteImage = debugElement.query(
      By.css('.pokemon-list-wrapper__sprite img'),
    );
    expect(spriteImage).toBeTruthy();
    expect(spriteImage.nativeElement.getAttribute('src')).toBe('pikachu.png');

    const numberElement = debugElement.query(
      By.css('.pokemon-list-wrapper__number'),
    );
    expect(numberElement).toBeTruthy();
    expect(numberElement.nativeElement.textContent).toContain('No. 1');

    const nameElement = debugElement.query(
      By.css('.pokemon-list-wrapper__name'),
    );
    expect(nameElement).toBeTruthy();
    expect(nameElement.nativeElement.textContent).toContain('Pikachu');
  });
});
