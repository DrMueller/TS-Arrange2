import { IElement } from '.';

import { Maybe, MaybeFactory } from '../../../infrastructure/language-extensions/maybe';

export class ElementCollection {
  constructor(private _bodyElements: IElement[], private textBeforeClassBody: string, private textAfterClassBody: string) {
  }

  public get bodyElements(): IElement[] {
    return this._bodyElements;
  }

  public overwriteBodyElements(newElements: IElement[]): void {
    this._bodyElements = newElements;
  }

  public writeAll(): string {
    let result = this.textBeforeClassBody;
    this.bodyElements.forEach(f => {
      result += f.getText();
    });

    result += this.textAfterClassBody;
    return result;
  }
}
