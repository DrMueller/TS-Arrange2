import { IElement } from '..';

export class UnknownElement implements IElement {
  public constructor(private text: string) {
  }

  public getSortString(): string {
    return this.text;
  }

  public getText(): string {
    return this.text;
  }
  public getConfigKey(): string {
    return 'unknown';
  }
}
