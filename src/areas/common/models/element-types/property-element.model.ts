import { LocatableElement } from '.';
import { ElementLocationBase, ElementVisibility } from '..';

export abstract class PropertyElement extends LocatableElement {

  protected constructor(
    elementVisibility: ElementVisibility,
    elementLocation: ElementLocationBase,
    text: string) {
    super(elementVisibility, elementLocation, text);
  }

  protected abstract get accessPrefix(): string;

  public getSortString(): string {
    const text = super.getText();
    const accessPosition = text.indexOf(this.accessPrefix);
    const propertyName = text.substring(accessPosition + this.accessPrefix.length);

    return propertyName;
  }

  protected get configKindDescription(): string {
    return 'method'; // Properties count as methods in TSLint
  }
}
