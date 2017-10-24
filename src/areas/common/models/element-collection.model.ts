import { Element } from '.';

export class ElementCollection {
  constructor(private bodyElements: Element[], private textBeforeClassBody: string, private textAfterClassBody: string) {
  }

  public writeAll(): string {
    let result = this.textBeforeClassBody;
    this.bodyElements.forEach(f => {
      result += f.text;
    });

    result += this.textAfterClassBody;
    return result;
  }
}
