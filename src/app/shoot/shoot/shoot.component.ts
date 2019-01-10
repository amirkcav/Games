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
  scoreChanged = false;
  newTargetInterval = 500;
  hideTargetInterval = 3000;
  typesFrequency = [ 'basic', 'basic', 'small', 'pulse', 'moving' ];

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
      // remove target
      setTimeout(() => {
        const targetIndex = this.viewContainerRef.indexOf(target.hostView);
        this.dynamicComponentService.removeDynamicTarget(targetIndex);
      }, shotTarget.config.shotEffectDuration);
      this.scoreTitleEffect();
    });
  }

  scoreTitleEffect() {
    this.scoreChanged = true;
    setTimeout(() => {
      this.scoreChanged = false;
    }, 200);
  }

  setTargetType(target: DynamicTargetComponent) {
    const i = Math.floor(Math.random() * this.typesFrequency.length);
    target.setType(this.typesFrequency[i]);
  }

}
