import { IElement } from '.';

export class ElementCollection {
  constructor(private bodyElements: IElement[], private textBeforeClassBody: string, private textAfterClassBody: string) {
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
