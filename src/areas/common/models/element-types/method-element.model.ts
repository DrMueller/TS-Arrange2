import { IElement } from '..';
import {
  ElementKind, ElementLocation, ElementLocationType, ElementVisibility
} from '../../../common/models';

export class MethodElement implements IElement {

  constructor(
    private elementVisibility: ElementVisibility,
    private elementLocation: ElementLocation,
    private text: string
  ) {
  }

  public getText(): string {
    return this.text;
  }

  public getConfigFormat(): string {
    return `${this.elementVisibility.configFormat}
    -${this.elementLocation.configFormat}
    -${this.elementKind.configFormat}`;
  }
}
