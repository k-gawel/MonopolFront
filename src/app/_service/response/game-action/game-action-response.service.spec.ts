import {TestBed} from '@angular/core/testing';

import {GameActionResponseService} from './game-action-response.service';

describe('GameActionResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameActionResponseService = TestBed.get(GameActionResponseService);
    expect(service).toBeTruthy();
  });
});
