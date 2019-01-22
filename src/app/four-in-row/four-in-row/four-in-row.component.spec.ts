import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourInRowComponent } from './four-in-row.component';

describe('FourInRowComponent', () => {
  let component: FourInRowComponent;
  let fixture: ComponentFixture<FourInRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourInRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourInRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
