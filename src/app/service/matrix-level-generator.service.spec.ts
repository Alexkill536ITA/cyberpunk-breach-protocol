import { TestBed } from '@angular/core/testing';

import { MatrixLevelGeneratorService } from './matrix-level-generator.service';

describe('MatrixLevelGeneratorService', () => {
  let service: MatrixLevelGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixLevelGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
