import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector,
  ViewContainerRef,
  Component,
  ComponentRef
} from '@angular/core';
import { DynamicTargetComponent } from '../shoot/dynamic-target/dynamic-target.component';
import { TimeoutService } from './timeout.service';

@Injectable()
export class DynamicComponentService {

  rootViewContainer: any;
  timeouts = {};

  constructor(private factoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, private timeoutService: TimeoutService) {

  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicTarget(hideDelay: number): ComponentRef<DynamicTargetComponent> {
    const factory = this.factoryResolver
                        .resolveComponentFactory(DynamicTargetComponent);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
    // auto hide.
    if (hideDelay) {
      const to = this.timeoutService.setTimeout(() => {
        // don't auto-hide shot target (so shot animations won't be cut).
        if (!component.instance.isShot) {
          const targetIndex = this.rootViewContainer.indexOf(component.hostView);
          if (targetIndex >= 0) {
            this.rootViewContainer.remove(targetIndex);
          }
        }
      }, hideDelay);
    }

    return component;
  }

  removeDynamicTarget(index: number) {
    this.rootViewContainer.remove(index);
  }

  pause(isPaused) {
    if (isPaused) {
      this.timeoutService.pause();
    }
    else {
      this.timeoutService.resume();
    }
  }

}
