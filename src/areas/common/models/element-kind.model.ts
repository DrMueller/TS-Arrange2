import { ElementKindType } from '.';

import { EnumUtilService } from '../../../infrastructure/utils/enum-utils';

export class ElementKind {
  public constructor(private type: ElementKindType) {
  }

  public static parse(str: string): ElementKind {
    const type = <ElementKindType>EnumUtilService.parseEnumEntry(ElementKindType, str);
    const result = new ElementKind(type);

    return result;
  }
}