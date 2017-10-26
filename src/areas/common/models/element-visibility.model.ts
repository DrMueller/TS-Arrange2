import { ElementVisibilityType } from '.';
import { EnumUtilService } from '../../../infrastructure/utils/enum-utils';

export class ElementVisibility {
  public constructor(public type: ElementVisibilityType) {
  }

  public get configFormat(): string {
    return ElementVisibilityType[this.type].toLowerCase();
  }

  public static parse(str: string): ElementVisibility {
    const type = <ElementVisibilityType>EnumUtilService.parseEnumEntry(ElementVisibilityType, str);
    const result = new ElementVisibility(type);

    return result;
  }
}
