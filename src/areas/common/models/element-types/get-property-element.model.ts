import { ElementLocationBase, ElementVisibility } from '..';
import { PropertyElement } from './property-element.model';

export class GetPropertyElement extends PropertyElement {

  public constructor(
    elementVisibility: ElementVisibility,
    elementLocation: ElementLocationBase,
    text: string) {
    super(elementVisibility, elementLocation, text);
  }

  protected get accessPrefix(): string {
    return ' get ';
  }
}
