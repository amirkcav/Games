export class Level {

  public levelNumber: number;
  public nextLevelStarts: number;
  public newTargetInterval: number;
  public hideTargetInterval: number;
  public typesFrequency: string[];

  constructor(levelNumber, nextLevelStarts, newTargetInterval, hideTargetInterval, typesFrequency) {
    this.levelNumber = levelNumber;
    this.nextLevelStarts = nextLevelStarts;
    this.newTargetInterval = newTargetInterval;
    this.hideTargetInterval = hideTargetInterval;
    this.typesFrequency = typesFrequency;
  }

} 
