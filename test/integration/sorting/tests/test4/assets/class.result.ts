export const ClassResult =
`
export class CountsMenuComponent extends BaseComponent {
  private _counts: CountModel = null;
  private _registers: Array<RegisterBaseModel> = null;

  public constructor(
      private readonly _injector: Injector) {
      super(_injector);
  }

  public get counts(): CountModel {
      return this._counts;
  }

  @Input()
  public set counts(value: CountModel) {
      this._counts = value;
  }

  public getSystemCount(registerIndex: number): number {
      return isNullOrUndefined(this.counts) ? 0 : this.counts.counts[registerIndex];
  }

  public get registers(): Array<RegisterBaseModel> {
      return this._registers;
  }

  @Input()
  public set registers(value: Array<RegisterBaseModel>) {
      this._registers = value;
  }
}
`;
