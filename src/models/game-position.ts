import { positionState } from './enums';

export class GamePosition {
  row: number;
  column: number;
  state: positionState;
  takenBy: any;
}
