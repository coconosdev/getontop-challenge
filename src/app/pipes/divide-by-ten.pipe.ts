import { Pipe, PipeTransform } from '@angular/core';

/**
 * DivideByTenPipe is responsible for dividing a number by ten.
 * (Given that the API returns values as multiples of ten).
 */
@Pipe({
  name: 'divideByTen',
})
export class DivideByTenPipe implements PipeTransform {
  /**
   * Transforms the input value by dividing it by ten.
   * @param value - The input value to be divided.
   * @returns The result of dividing the input value by ten.
   * @throws If the input value is not a number, an error is logged, and 0 is returned.
   */
  transform(value: unknown): number {
    if (typeof value !== 'number') {
      console.error('Invalid input. The input should be a number.');
      return 0;
    }

    return value / 10;
  }
}
