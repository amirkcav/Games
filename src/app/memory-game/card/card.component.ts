import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // @Input() position;
  // @Input() value;
  @Input() card: Card;
  // isSelected = false;
  // done = false;

  constructor() { }

  ngOnInit() {
  }

  // cardClick(event) {
  //   this.isSelected = !this.isSelected;
  // }

}
