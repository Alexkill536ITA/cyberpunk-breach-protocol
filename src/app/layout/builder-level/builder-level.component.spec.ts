import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderLevelComponent } from './builder-level.component';

describe('BuilderLevelComponent', () => {
  let component: BuilderLevelComponent;
  let fixture: ComponentFixture<BuilderLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuilderLevelComponent]
    });
    fixture = TestBed.createComponent(BuilderLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
