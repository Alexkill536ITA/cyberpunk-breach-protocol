import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptAnimationsComponent } from './script-animations.component';

describe('ScriptAnimationsComponent', () => {
  let component: ScriptAnimationsComponent;
  let fixture: ComponentFixture<ScriptAnimationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptAnimationsComponent]
    });
    fixture = TestBed.createComponent(ScriptAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
