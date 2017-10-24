import { SortingConfigurationEntry } from '../../../../models';

import { ElementKind, ElementLocation, ElementVisibility, ElementLocationType } from '../../../../../common/models';

export class SortingConfigurationEntryFactory {
  public static parseFromLine(line: string, sequence: number): SortingConfigurationEntry {
    const trimmedLine = this.trimLine(line);

    const elementBlocks = trimmedLine.split('-');
    const visibility = ElementVisibility.parse(elementBlocks[0]);
    let location: ElementLocation;
    let kind: ElementKind;

    if (elementBlocks.length === 2) {
      location = new ElementLocation(ElementLocationType.Unknown);
      kind = ElementKind.parse(elementBlocks[1]);
    } else {
      location = ElementLocation.parse(elementBlocks[1]);
      kind = ElementKind.parse(elementBlocks[2]);
    }

    const result = new SortingConfigurationEntry(visibility, location, kind, sequence);
    return result;
  }

  private static trimLine(line: string): string {
    const textStart = line.indexOf('"') + 1;
    const textEnd = line.indexOf('"', textStart);
    const result = line.substring(textStart, textEnd);

    return result;
  }

}