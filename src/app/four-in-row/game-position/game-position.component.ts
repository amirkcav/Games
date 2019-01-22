import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GamePosition } from '../../../models/game-position';
import { positionState } from '../../../models/enums';

@Component({
  selector: 'app-game-position',
  templateUrl: './game-position.component.html',
  styleUrls: ['./game-position.component.css']
})
export class GamePositionComponent implements OnInit {

  @Input() positionData: GamePosition;
  @Output() positionClick: EventEmitter<any> = new EventEmitter();
  availableState = positionState.available;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    // this.positionData.state = positionState.taken;
    this.positionClick.emit(this.positionData);
  }

}
