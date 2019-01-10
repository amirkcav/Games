export class Card {

  constructor(position: number, value: any) {
    this.position = position;
    this.value = value;
  }

  public position: number;
  public value: any;
  public isSelected = false;
  public inPair = false;
}
