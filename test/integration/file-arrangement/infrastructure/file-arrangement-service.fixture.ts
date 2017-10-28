import { FileArrangemengServiceName, IFileArrangemengService } from '../../../../src/areas/file-arrangement';
import { IocInitializationService } from '../../../../src/infrastructure/Ioc/ioc-configuration.service';
import { IocContainerSingleton } from '../../../../src/infrastructure/Ioc';

export class FileArrangementServiceFixture {
  private readonly _fixture: IFileArrangemengService;

  constructor() {
    IocInitializationService.initialize();
    this._fixture = IocContainerSingleton.resolve(FileArrangemengServiceName);
  }

  public arrange(testFileName: string): void {
    

  }
}
