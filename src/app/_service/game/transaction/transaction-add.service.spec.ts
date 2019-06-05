import { TestBed } from '@angular/core/testing';

import { TransactionAddService } from './transaction-add.service';

describe('TransactionAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionAddService = TestBed.get(TransactionAddService);
    expect(service).toBeTruthy();
  });
});
