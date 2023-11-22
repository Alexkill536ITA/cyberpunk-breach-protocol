import { TestBed } from '@angular/core/testing';

import { MatrixGeneratorService } from './matrix-generator.service';

describe('MatrixLevelGeneratorService', () => {
  let service: MatrixGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
