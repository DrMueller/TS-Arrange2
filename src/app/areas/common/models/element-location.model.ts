import { ElementLocationType } from '.';
import { EnumUtilService } from '../../../infrastructure/utils/enum-utils';

export class ElementLocation {
  public constructor(public type: ElementLocationType) {
  }

  public get configKey(): string {
    return ElementLocationType[this.type].toLowerCase();
  }

  public static parse(str: string): ElementLocation {
    const type = <ElementLocationType>EnumUtilService.parseEnumEntry(ElementLocationType, str);
    const result = new ElementLocation(type);

    return result;
  }
}
