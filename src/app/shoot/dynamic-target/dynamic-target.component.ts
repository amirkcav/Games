import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TargetConfig } from '../../../models/target-config';

@Component({
  selector: 'app-dynamic-target',
  templateUrl: './dynamic-target.component.html',
  styleUrls: ['./dynamic-target.component.css']
})
export class DynamicTargetComponent implements OnInit {

  @Output() shot: EventEmitter<any> = new EventEmitter();

  positionTop: number;
  positionLeft: number;
  isShot = false;
  type: string;
  // // index is set by the DynamicComponentService on component creation.
  // index: number;
  config = new TargetConfig();

  constructor() { }

  ngOnInit() {
    this.setRandomPosition();
  }

  setRandomPosition() {
    // position is in precentage. not 100 not to get out of bounds.
    this.positionLeft = Math.random() * 95;
    this.positionTop = Math.random() * 95;
  }

  onShot(event) {
    event.stopPropagation();
    this.isShot = true;
    this.shot.emit(this);
  }

  setType(type: string) {
    this.type = type;
    this.config = new TargetConfig(type);
  }
  
}
