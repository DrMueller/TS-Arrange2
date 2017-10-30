import {
  IElement
} from '../../../../common/models';

export class MappingResult {
  private constructor(public isMapped: boolean, public mappedElement: IElement | null) { }

  public static createdMapped(element: IElement): MappingResult {
    return new MappingResult(true, element);
  }

  public static createUnmapped(): MappingResult {
    return new MappingResult(false, null);
  }
}
