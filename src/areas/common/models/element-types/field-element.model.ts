import { LocatableElement } from '.';
import { ElementLocationBase, ElementVisibility } from '../../../common/models';

export class FieldElement extends LocatableElement {

  public constructor(
    elementVisibility: ElementVisibility,
    elementLocation: ElementLocationBase,
    text: string) {
    super(elementVisibility, elementLocation, text);
  }

  protected get configKindDescription(): string {
    return 'field';
  }
}
