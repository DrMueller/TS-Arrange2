import { IElement } from '..';

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
