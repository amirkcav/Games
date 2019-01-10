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

@Injectable()
export class DynamicComponentService {

  rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {

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
    // // set the index of the component.
    // component.instance.index = this.rootViewContainer.length - 1;
    // auto hide.
    if (hideDelay) {
      setTimeout(() => {
        const targetIndex = this.rootViewContainer.indexOf(component.hostView);
        if (targetIndex >= 0) {
          this.rootViewContainer.remove(targetIndex);
        }
      }, hideDelay);
    }

    return component;
  }

  removeDynamicTarget(index: number) {
    this.rootViewContainer.remove(index);
  }

}