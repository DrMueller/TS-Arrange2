import { SortingConfigurationEntry } from '.';
import { Maybe, MaybeFactory } from '../../../infrastructure/language-extensions/maybe';

export class Configuration {
  constructor(private sortingConfigEntries: SortingConfigurationEntry[]) {
  }

  public tryGetConfigEntry(key: string): Maybe<SortingConfigurationEntry> {
    const entry = this.sortingConfigEntries.find(f => f.configKey === key);
    if (entry) {
      return MaybeFactory.createSome(entry);
    }

    return MaybeFactory.createNone();
  }
}
