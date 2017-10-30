import { Maybe } from './maybe.model';

export class SomeMaybe<T> extends Maybe<T> {

  public constructor(private value: T) {
    super();
  }

  public whenSome(action: (value: T) => void): void {
    action(this.value);
  }
  public whenNone(action: () => void): void {
  }
}
