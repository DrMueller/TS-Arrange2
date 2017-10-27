import { Maybe } from './maybe.model';

export class NoneMaybe<T> extends Maybe<T> {
  public whenNone(action: () => void): void {
    action();
  }

  public constructor() {
    super();
  }

  public whenSome(action: (value: T) => void): void {
  }
}
