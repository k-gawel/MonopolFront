import { TestBed } from '@angular/core/testing';

import { InstanceHighlightService } from './instance-highlight.service';

describe('InstanceHighlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstanceHighlightService = TestBed.get(InstanceHighlightService);
    expect(service).toBeTruthy();
  });
});
