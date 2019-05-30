import { ElementBlock } from '.';
import { IElement } from '../../common/models';

export class SortedElementCollection {
  private _knownElementBlocks = new Array<ElementBlock>();
  private _unknownElements = new Array<IElement>();

  public addKnownBlock(elementBlock: ElementBlock): void {
    this._knownElementBlocks.push(elementBlock);
  }

  public addUnknownElements(elements: IElement[]): void {
    this._unknownElements.push(...elements);
  }

  public sortAndGetFlatList(): IElement[] {
    const flatList = new Array<IElement>();
    this.sortAndAppendKnownBlocks(flatList);
    this.sortAndAppendUnknownElements(flatList);
    return flatList;
  }

  private sortAndAppendKnownBlocks(elements: IElement[]): void {
    const sortedBlocks = this._knownElementBlocks.sort((a, b) => {
      if (a.sequence > b.sequence) {
        return 1;
      } else if (a.sequence < b.sequence) {
        return -1;
      }

      return 0;
    });

    sortedBlocks.forEach(block => {
      const sortedElements = this.sortElements(block.elements);
      elements.push(...sortedElements);
    });
  }

  private sortAndAppendUnknownElements(elements: IElement[]): void {
    const sortedUnknownElements = this.sortElements(this._unknownElements);
    elements.push(...sortedUnknownElements);
  }

  private sortElements(elements: IElement[]): IElement[] {
    const result = elements.sort((a, b) => {
      const sortStringA = a.getSortString();
      const sortStringB = b.getSortString();

      if (sortStringA < sortStringB) {
        return -1;
      }

      if (sortStringA > sortStringB) {
        return 1;
      }

      return 0;
    });

    return result;
  }
}
