import { LocatableElement } from '.';
import { ElementLocation, ElementVisibility } from '../../../common/models';

export class FieldElement extends LocatableElement {

  public constructor(
    elementVisibility: ElementVisibility,
    elementLocation: ElementLocation,
    text: string) {
    super(elementVisibility, elementLocation, text);
  }

  protected get configKindDescription(): string {
    return 'field';
  }
}
