import { IElement } from '..';
import { ElementLocationBase, ElementVisibility } from '../../../common/models';

export abstract class LocatableElement implements IElement {
  protected constructor(
    private elementVisibility: ElementVisibility,
    private elementLocation: ElementLocationBase,
    private text: string
  ) {
  }

  public getConfigKey(): string {
    return `${this.elementVisibility.configKey}-${this.elementLocation.configKey}-${this.configKindDescription}`;
  }

  public getSortString(): string {
    let prefix = this.elementVisibility.configKey + ' ';
    if (this.elementLocation.codeRepresentation !== '') {
      prefix += this.elementLocation.codeRepresentation + ' ';
    }

    const text = this.text.trim().substring(prefix.length);
    return text;
  }

  public getText(): string {
    return this.text;
  }

  protected abstract get configKindDescription(): string;
}
