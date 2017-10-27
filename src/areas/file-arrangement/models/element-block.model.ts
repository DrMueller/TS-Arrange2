import { IElement } from "../../common/models";

export class ElementBlock {

  public get elements(): IElement[] {
    return this._elements;
  }

  public get sequence(): number {
    return this._sequence;
  }

  public constructor(private _elements: IElement[], private _sequence: number) { }
}
