import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePositionComponent } from './game-position.component';

describe('GamePositionComponent', () => {
  let component: GamePositionComponent;
  let fixture: ComponentFixture<GamePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
