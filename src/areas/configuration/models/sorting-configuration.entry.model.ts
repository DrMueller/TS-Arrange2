import {
  ElementLocation, ElementVisibility, ElementKind,
} from '../../../areas/common/models';

export class SortingConfigurationEntry {
  public constructor(
    public elementVisibility: ElementVisibility,
    public elementLocation: ElementLocation,
    public elementKind: ElementKind,
    public sequence: number) {
  }
}