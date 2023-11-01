import { DivideByTenPipe } from './divide-by-ten.pipe';

describe('DivideByTenPipe', () => {
  let pipe: DivideByTenPipe;

  beforeEach(() => {
    pipe = new DivideByTenPipe();
  });

  it('should create an instance of the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should divide a number by ten', () => {
    const input = 30;
    const result = pipe.transform(input);
    expect(result).toEqual(3);
  });

  it('should handle undefined input', () => {
    const input = undefined;
    const result = pipe.transform(input);
    expect(result).toEqual(0);
  });

  it('should handle non-numeric input', () => {
    const input = 'invalid';
    const result = pipe.transform(input);
    expect(result).toEqual(0);
  });
});
