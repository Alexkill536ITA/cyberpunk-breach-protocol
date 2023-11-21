import { TestBed } from '@angular/core/testing';

import { ControlerSqllite3Service } from './controler-sqllite3.service';

describe('ControlerSqllite3Service', () => {
  let service: ControlerSqllite3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlerSqllite3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
