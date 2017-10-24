import { ElementKind, ElementLocation, ElementVisibility } from '../../common/models';

export class Element {
  constructor(
    public elementVisibility: ElementVisibility,
    public elementLocation: ElementLocation,
    public elementKind: ElementKind,
    public text: string
  ) {

  }
}