import { IElement } from '..';
import {
  ElementKind, ElementLocation, ElementLocationType, ElementVisibility
} from '../../../common/models';

export class ConstructorElement implements IElement {
  constructor(
    private elementVisibility: ElementVisibility,
    private elementKind: ElementKind,
    private text: string
  ) {
  }

  public getText(): string {
    return this.text;
  }


  public getConfigFormat(): string {
    return `${this.elementVisibility.configFormat}
    -${this.elementKind.configFormat}`;
  }
}
