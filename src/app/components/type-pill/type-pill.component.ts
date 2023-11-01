import { Component, Input } from '@angular/core';

/**
 * TypePillComponent is responsible for displaying a colored type pill.
 */
@Component({
  selector: 'app-type-pill',
  templateUrl: './type-pill.component.html',
  styleUrls: ['./type-pill.component.scss'],
})
export class TypePillComponent {
  /**
   * The type of the pill, e.g., 'normal'.
   */
  @Input() type = 'normal';

  /**
   * Get the background styles for the type pill.
   * @returns An object with background-color styles.
   */
  public getBackgroundStyles(): {
    'background-color': string;
  } {
    const styles = {
      'background-color': `var(--type-${this.type})`,
    };
    return styles;
  }
}
