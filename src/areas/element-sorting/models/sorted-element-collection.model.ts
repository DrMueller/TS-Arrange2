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
      const sortedElements = this.sortElementsByName(block.elements);
      elements.push(...sortedElements);
    });
  }

  private sortAndAppendUnknownElements(elements: IElement[]): void {
    const sortedUnknownElements = this.sortElementsByName(this._unknownElements);
    elements.push(...sortedUnknownElements);
  }

  private sortElementsByName(elements: IElement[]): IElement[] {
    const result = elements.sort((a, b) => {
      if (a.getText() < b.getText()) {
        return -1;
      }

      if (a.getText() > b.getText()) {
        return 1;
      }

      return 0;
    });

    return result;
  }
}
