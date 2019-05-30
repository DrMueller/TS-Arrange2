export const ClassFixture =
`
export class CountsMenuComponent extends BaseComponent {
  private _registers: Array<RegisterBaseModel> = null;
  private _counts: CountModel = null;

  public constructor(
      private readonly _injector: Injector) {
      super(_injector);
  }

  @Input()
  public set counts(value: CountModel) {
      this._counts = value;
  }

  @Input()
  public set registers(value: Array<RegisterBaseModel>) {
      this._registers = value;
  }

  public get counts(): CountModel {
      return this._counts;
  }

  public get registers(): Array<RegisterBaseModel> {
      return this._registers;
  }

  public getSystemCount(registerIndex: number): number {
      return isNullOrUndefined(this.counts) ? 0 : this.counts.counts[registerIndex];
  }
}
`;
