import { IElement } from '..';
import { ElementVisibility } from '../../../common/models';

export class ConstructorElement implements IElement {
  constructor(
    private elementVisibility: ElementVisibility,
    private text: string
  ) {
  }

  public getSortString(): string {
    return this.text;
  }

  public getText(): string {
    return this.text;
  }

  public getConfigKey(): string {
    return `${this.elementVisibility.configKey}-constructor`;
  }
}
