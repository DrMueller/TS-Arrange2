import { Maybe } from './maybe.model';

export class NoneMaybe<T> extends Maybe<T> {
  public constructor() {
    super();
  }

  public whenSome(action: (value: T) => void): void {
  }

  public whenNone(action: () => void): void {
    action();
  }
}
