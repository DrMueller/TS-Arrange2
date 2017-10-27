import { IElement } from '..';
import {
  ElementLocation, ElementLocationType, ElementVisibility
} from '../../../common/models';

export abstract class LocatableElement implements IElement {
  constructor(
    private elementVisibility: ElementVisibility,
    private elementLocation: ElementLocation,
    private text: string
  ) {
  }

  public getText(): string {
    return this.text;
  }

  protected abstract get configKindDescription(): string;

  public getConfigKey(): string {
    return `${this.elementVisibility.configKey}-${this.elementLocation.configKey}-${this.configKindDescription}`;
  }
}
