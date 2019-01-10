export class TargetConfig {

  // duration in ms
  shotEffectDuration: number;
  score: number;

  constructor(type = 'regular') {
    switch (type) {
      case 'regular':
        this.score = 1;
        this.shotEffectDuration = 750;
        break;
      case 'small':
        this.score = 2;
        this.shotEffectDuration = 1000;
        break;
      default:
        this.score = 1;
        this.shotEffectDuration = 750;
        break;
    }
  }
}
