export class TargetConfig {

  // duration in ms
  shotEffectDuration = 750;
  score = 1;

  constructor(type = 'basic') {

    switch (type) {
      case 'basic':
        this.score = 1;
        this.shotEffectDuration = 750;
        break;
      case 'small':
        this.score = 2;
        this.shotEffectDuration = 1000;
        break;
      case 'pulse':
        this.score = 2;
        this.shotEffectDuration = 750;
        break;
      case 'moving':
        this.score = 4;
        this.shotEffectDuration = 1000;
        break;
      case 'flashing':
        this.score = 4;
        this.shotEffectDuration = 750;
        break;
      case 'rotating':
        this.score = 4;
        this.shotEffectDuration = 750;
        break;
      default:
        this.score = 1;
        this.shotEffectDuration = 750;
        break;
    }

  }
}
