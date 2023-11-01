import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PAGE_SIZE } from 'src/app/globlal';
import { AppState } from 'src/app/store';
import * as PokemonActions from 'src/app/store/actions';

/**
 * PaginatorComponent is responsible for handling pagination operations.
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  /**
   * The number of items to display per page.
   */
  public limit: number = PAGE_SIZE;
  /**
   * The current offset in the paginated data.
   */
  public offset = 0;

  constructor(private store: Store<AppState>) {}

  /**
   * Navigate to the previous page of data.
   * @remarks If the current offset allows, it decrements the offset by the page limit.
   */
  previousPage(): void {
    if (this.offset - this.limit > 0) {
      this.offset = this.offset - this.limit;
      this.dispatchEvent();
    }
  }

  /**
   * Navigate to the next page of data.
   * @remarks If the current offset allows, it increments the offset by the page limit.
   */
  nextPage(): void {
    if (this.offset < 1200) {
      this.offset = this.offset + this.limit;
      this.dispatchEvent();
    }
  }

  /**
   * Dispatch a pagination event to load data.
   * @remarks It triggers the loading of data with the current pagination settings.
   */
  dispatchEvent(): void {
    this.store.dispatch(
      PokemonActions.getAllPokemon.start({
        limit: this.limit,
        offset: this.offset,
      }),
    );
  }
}
