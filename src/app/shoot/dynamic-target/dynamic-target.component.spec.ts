import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTargetComponent } from './dynamic-target.component';

describe('DynamicTargetComponent', () => {
  let component: DynamicTargetComponent;
  let fixture: ComponentFixture<DynamicTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
