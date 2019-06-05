import {TestBed} from '@angular/core/testing';

import {PlayerActionResponseService} from './player-action-response.service';

describe('PlayerActionResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerActionResponseService = TestBed.get(PlayerActionResponseService);
    expect(service).toBeTruthy();
  });
});
