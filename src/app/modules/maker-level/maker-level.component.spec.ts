import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerLevelComponent } from './maker-level.component';

describe('MakerLevelComponent', () => {
  let component: MakerLevelComponent;
  let fixture: ComponentFixture<MakerLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakerLevelComponent]
    });
    fixture = TestBed.createComponent(MakerLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
