import { TestBed } from '@angular/core/testing';

import { StocksResolver } from './stocks.resolver';

describe('StocksResolver', () => {
  let resolver: StocksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StocksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
