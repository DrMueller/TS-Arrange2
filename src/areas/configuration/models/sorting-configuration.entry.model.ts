import {
  ElementLocation, ElementVisibility
} from '../../../areas/common/models';

export class SortingConfigurationEntry {
  public constructor(
    // public elementVisibility: ElementVisibility,
    // public elementLocation: ElementLocation,
    // public elementKind: ElementKind,
    public configKey: string,
    public sequence: number) {
  }
}