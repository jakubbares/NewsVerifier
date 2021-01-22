import {merge, Observable, Subscription} from 'rxjs';
import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EventEmitter, Injector} from '@angular/core';
import {map} from 'rxjs/operators';

function createCustomEvent(doc: Document, name: string, detail: any): CustomEvent {
  const bubbles = false;
  const cancelable = false;

  // On IE9-11, `CustomEvent` is not a constructor.
  if ( typeof CustomEvent !== 'function' ) {
    const event = doc.createEvent('CustomEvent');
    event.initCustomEvent(name, bubbles, cancelable, detail);
    return event;
  }

  return new CustomEvent(name, { bubbles, cancelable, detail });
}

function camelToDashCase(input: string): string {
  return input.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
}

function getComponentFactory(component, injector) {
  const componentFactoryResolver = injector.get(ComponentFactoryResolver);
  return componentFactoryResolver.resolveComponentFactory(component);
}

function getDefaultAttributeToPropertyInputs(
  inputs: { propName: string, templateName: string }[]) {
  const attributeToPropertyInputs: { [key: string]: string } = {};
  inputs.forEach(({ propName, templateName }) => {
    attributeToPropertyInputs[camelToDashCase(templateName)] = propName;
  });

  return attributeToPropertyInputs;
}

function initializeOutputs(outputs, instance): Observable<any> {
  const eventEmitters = outputs.map(({ propName, templateName }) => {
    const emitter = instance[propName] as EventEmitter<any>;
    return emitter.pipe(map((value: any) => ({ name: templateName, value })));
  });

  return merge(...eventEmitters);
}

function initializeComponent(element: HTMLElement, component, injector: Injector) {
  const childInjector = Injector.create({ providers: [], parent: injector });
  const componentFactory = getComponentFactory(component, injector);
  const componentRef = componentFactory.create(childInjector, [], element);
  componentRef.changeDetectorRef.detectChanges();
  const applicationRef = injector.get<ApplicationRef>(ApplicationRef);
  applicationRef.attachView(componentRef.hostView);

  return componentRef;
}

export function customElementPlease(component, { injector }) {
  const factory = getComponentFactory(component, injector);
  const inputs = factory.inputs;
  const attributeToPropertyInputs = getDefaultAttributeToPropertyInputs(inputs);

  class NgElement extends HTMLElement {
    static observedAttributes = Object.keys(attributeToPropertyInputs);
    componentRef: ComponentRef<any>;
    subscription: Subscription;

    constructor() {
      super();
    }

    connectedCallback(): void {
      if ( !this.componentRef ) {
        this.componentRef = initializeComponent(this, component, injector);
      }

      const outputs = initializeOutputs(factory.outputs, this.componentRef.instance);

      this.subscription = outputs.subscribe(e => {
        const customEvent = createCustomEvent(this.ownerDocument, e.name, e.value);
        this.dispatchEvent(customEvent);
      });
    }

    getInputValue(name: string) {
      return this.componentRef.instance[name];
    }

    setInputValue(property, newValue) {
      this.componentRef.instance[property] = newValue;
      this.componentRef.changeDetectorRef.detectChanges();
    }

    attributeChangedCallback(
      attrName: string, oldValue: string | null, newValue: string): void {
      if ( !this.componentRef ) {
        this.componentRef = initializeComponent(this, component, injector);
      }
      const propName = attributeToPropertyInputs[attrName] !;
      this.setInputValue(propName, newValue);
    }

    disconnectedCallback(): void {
      if ( this.componentRef ) {
        this.componentRef !.destroy();
        this.componentRef = null;
      }
      if ( this.subscription ) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
  }

  inputs.map(({ propName }) => propName).forEach(property => {
    Object.defineProperty(NgElement.prototype, property, {
      get: function() {
        return this.getInputValue(property);
      },
      set: function(newValue: any) {
        this.setInputValue(property, newValue);
      },
      configurable: true,
      enumerable: true,
    });
  });

  return NgElement;
}
