import { Maybe } from '.';
import { NoneMaybe } from './none-maybe.model';
import { SomeMaybe } from './some-maybe.model';

export class MaybeFactory {
  public static createSome<T>(value: T): Maybe<T> {
    return new SomeMaybe(value);
  }

  public static createNone<T>(): Maybe<T> {
    return new NoneMaybe();
  }
}
