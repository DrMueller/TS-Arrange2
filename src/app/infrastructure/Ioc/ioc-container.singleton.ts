import { Container } from 'inversify';

export class IocContainerSingleton {
  private static _container: Container;

  public static resolve<T>(serviceIdentifier: string): T {
    const result = this._container.get<T>(serviceIdentifier);
    return result;
  }

  public static initialize(container: Container): void {
    this._container = container;
  }
}
