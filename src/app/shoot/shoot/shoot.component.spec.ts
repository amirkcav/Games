import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootComponent } from './shoot.component';

describe('ShootComponent', () => {
  let component: ShootComponent;
  let fixture: ComponentFixture<ShootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
