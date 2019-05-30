import { ElementLocationBase, ElementVisibility } from '..';
import { PropertyElement } from './property-element.model';

export class SetPropertyElement extends PropertyElement {
  protected get accessPrefix(): string {
    return ' set ';
  }

  public constructor(
    elementVisibility: ElementVisibility,
    elementLocation: ElementLocationBase,
    text: string) {
    super(elementVisibility, elementLocation, text);
  }

}

