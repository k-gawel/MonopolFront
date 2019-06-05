import {TestBed} from '@angular/core/testing';

import {TransactionRequestService} from './transaction-request.service';

describe('TransactionRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionRequestService = TestBed.get(TransactionRequestService);
    expect(service).toBeTruthy();
  });
});
