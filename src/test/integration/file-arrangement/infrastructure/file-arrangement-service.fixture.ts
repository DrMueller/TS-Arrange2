import { FileArrangemengServiceName, IFileArrangemengService } from '../../../../app/areas/file-arrangement';
import { IocInitializationService } from '../../../../app/infrastructure/Ioc/ioc-configuration.service';
import { IocContainerSingleton } from '../../../../app/infrastructure/Ioc';

export class FileArrangementServiceFixture {
  private readonly _fixture: IFileArrangemengService;

  constructor() {
    IocInitializationService.initialize();
    this._fixture = IocContainerSingleton.resolve(FileArrangemengServiceName);
  }

  public async arrangeAsync(): Promise<void> {
    await this._fixture.arrangeOnCurrentDocumentAsync();
  }
}
