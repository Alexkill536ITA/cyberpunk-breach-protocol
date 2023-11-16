import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixListShowComponent } from './matrix-list-show.component';

describe('MatrixListShowComponent', () => {
  let component: MatrixListShowComponent;
  let fixture: ComponentFixture<MatrixListShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixListShowComponent]
    });
    fixture = TestBed.createComponent(MatrixListShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
