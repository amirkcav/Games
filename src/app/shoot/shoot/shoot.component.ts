import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { DynamicTargetComponent } from '../dynamic-target/dynamic-target.component';
import { TimeoutService } from '../../services/timeout.service';
import { LevelsService } from '../../services/levels.service';
import { Http } from '@angular/http';
import { Level } from '../../../models/level';

@Component({
  selector: 'app-shoot',
  templateUrl: './shoot.component.html',
  styleUrls: ['./shoot.component.css'],
  providers: [DynamicComponentService, TimeoutService, LevelsService]
})
export class ShootComponent implements OnInit {
  
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  score = 0;
  scoreChangedA = false;
  scoreChangedB = false;
  scoreChangedBTimeout: any;
  scoreChange: number;
  missedClicks = 0;
  isPaused = false;
  levels: Level[];
  currentLevel: Level;
  currentLevelIndex = 0;
  levelChanged = false;

  // newTargetInterval = 500;
  // hideTargetInterval = 3000;
  // typesFrequency = [ 'basic', 'basic', 'small', 'pulse', 'moving', 'flashing' ];

  constructor(private dynamicComponentService: DynamicComponentService, private levelsService: LevelsService) { }

  ngOnInit() {
    this.levelsService.loadLevels().then((res) => {
      this.levels = res['levels'];
      this.currentLevel = this.levels[this.currentLevelIndex];
      setInterval(() => {
        if (!this.isPaused) {
          this.addTarget();
        }
      }, this.currentLevel.newTargetInterval + Math.random() * 500);
    });
  }

  addTarget() {
    this.dynamicComponentService.setRootViewContainerRef(this.viewContainerRef);
    const target: ComponentRef<DynamicTargetComponent> = this.dynamicComponentService.addDynamicTarget(this.currentLevel.hideTargetInterval);
    
    this.setTargetType(target.instance);
    
    // handle target shot.
    target.instance.shot.subscribe((shotTarget: DynamicTargetComponent) => {
      this.score += shotTarget.config.score; 
      this.scoreChange = shotTarget.config.score; 
      this.updateLevel();
      // remove target
      setTimeout(() => {
        const targetIndex = this.viewContainerRef.indexOf(target.hostView);
        this.dynamicComponentService.removeDynamicTarget(targetIndex);
      }, shotTarget.config.shotEffectDuration - 10); // -10 is to make sure that the element won't still be shown after the shot animation ended.
      this.scoreTitleEffect();
    });
  }

  scoreTitleEffect() {
    this.scoreChangedA = true;
    
    setTimeout(() => {
      this.scoreChangedA = false;
    }, 200);

    if (this.scoreChangedBTimeout) {
      clearTimeout(this.scoreChangedBTimeout);
    }
    this.scoreChangedB = true;
    this.scoreChangedBTimeout = setTimeout(() => {
      this.scoreChangedB = false;
    }, 1000);
  }

  setTargetType(target: DynamicTargetComponent) {
    const i = Math.floor(Math.random() * this.currentLevel.typesFrequency.length);
    target.setType(this.currentLevel.typesFrequency[i]);
  }

  onClick() {
    this.missedClicks++;
  }

  pause(pause?) {
    this.isPaused = !this.isPaused;
    this.dynamicComponentService.pause(this.isPaused);
  }

  updateLevel() {
    if (this.score >= this.currentLevel.nextLevelStarts && this.levels.length > this.currentLevelIndex + 1) {
      this.currentLevelIndex++;
      this.currentLevel = this.levels[this.currentLevelIndex];
      this.levelChanged = true;
      setTimeout(() => {
        this.levelChanged = false;
      }, 1500);
    }
  }
}
