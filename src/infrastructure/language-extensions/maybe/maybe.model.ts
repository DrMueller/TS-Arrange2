import { Action, GenericParametrizedAction } from '../../types';

export abstract class Maybe<T> {
  public abstract whenSome(action: GenericParametrizedAction<T>): void;
  public abstract whenNone(action: Action): void;
}
