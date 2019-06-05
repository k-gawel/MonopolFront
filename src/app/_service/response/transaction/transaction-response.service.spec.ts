import {TestBed} from '@angular/core/testing';

import {TransactionResponseService} from './transaction-response.service';

describe('TransactionResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionResponseService = TestBed.get(TransactionResponseService);
    expect(service).toBeTruthy();
  });
});
