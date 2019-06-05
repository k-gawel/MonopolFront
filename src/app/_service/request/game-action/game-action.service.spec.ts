import {TestBed} from '@angular/core/testing';

import {GameActionService} from './game-action.service';

describe('GameActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameActionService = TestBed.get(GameActionService);
    expect(service).toBeTruthy();
  });
});
