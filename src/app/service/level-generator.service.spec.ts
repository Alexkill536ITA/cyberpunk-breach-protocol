import { TestBed } from '@angular/core/testing';

import { LevelGeneratorService } from './level-generator.service';

describe('LevelGeneratorService', () => {
  let service: LevelGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
