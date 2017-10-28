import { SortingConfigurationEntry } from '../../../../models';

export class SortingConfigurationEntryFactory {
  public static parseFromLine(line: string, sequence: number): SortingConfigurationEntry {
    const trimmedLine = this.trimLine(line);

    const result = new SortingConfigurationEntry(trimmedLine, sequence);
    return result;
  }

  private static trimLine(line: string): string {
    const textStart = line.indexOf('"') + 1;
    const textEnd = line.indexOf('"', textStart);
    const result = line.substring(textStart, textEnd);

    return result;
  }
}
