import { IElement } from '..';
import { ElementLocation, ElementLocationType, ElementVisibility } from '../../../common/models';

export class UnknownElement implements IElement {
  public getConfigKey(): string {
    return 'unknown';
  }

  public getText(): string {
    return this.text;
  }

  public constructor(private text: string) {
  }

}
