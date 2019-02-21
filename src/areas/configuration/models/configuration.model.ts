import { SortingConfigurationEntry } from '.';
import { IMaybe, Maybe } from '@drmueller/language-extensions';

export class Configuration {
  constructor(private sortingConfigEntries: SortingConfigurationEntry[]) {
  }

  public tryGetConfigEntry(key: string): IMaybe<SortingConfigurationEntry> {
    const entry = this.sortingConfigEntries.find(f => f.configKey === key);
    if (entry) {
      return Maybe.createSome(entry);
    }

    return Maybe.createNone();
  }
}
