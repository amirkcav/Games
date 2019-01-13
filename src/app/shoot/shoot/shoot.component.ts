import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { DynamicTargetComponent } from '../dynamic-target/dynamic-target.component';

@Component({
  selector: 'app-shoot',
  templateUrl: './shoot.component.html',
  styleUrls: ['./shoot.component.css'],
  providers: [DynamicComponentService ]
})
export class ShootComponent implements OnInit {
  
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  score = 0;
  scoreChangedA = false;
  scoreChangedB = false;
  scoreChangedBTimeout: any;
  scoreChange: number;
  missedClicks = 0;
  
  newTargetInterval = 500;
  hideTargetInterval = 3000;
  typesFrequency = [ 'basic', 'basic', 'small', 'pulse', 'moving', 'flashing' ];

  constructor(private dynamicComponentService: DynamicComponentService/*, private viewContainerRef: ViewContainerRef*/) { }

  ngOnInit() {
    setInterval(() => {
      this.addTarget();
    }, this.newTargetInterval + Math.random() * 500);
  }

  addTarget() {
    this.dynamicComponentService.setRootViewContainerRef(this.viewContainerRef);
    const target: ComponentRef<DynamicTargetComponent> = this.dynamicComponentService.addDynamicTarget(this.hideTargetInterval);
    
    this.setTargetType(target.instance);
    
    // handle target shot.
    target.instance.shot.subscribe((shotTarget: DynamicTargetComponent) => {
      this.score += shotTarget.config.score; 
      this.scoreChange = shotTarget.config.score; 
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
    const i = Math.floor(Math.random() * this.typesFrequency.length);
    target.setType(this.typesFrequency[i]);
  }

  onClick() {
    this.missedClicks++;
  }

}
