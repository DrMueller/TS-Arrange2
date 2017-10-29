import { inject, injectable } from 'inversify';

import { IFileArrangemengService } from '..';
import { ConfigurationFactoryName, IConfigurationFactory } from '../../../configuration';
import { EditorServiceName, IEditorService } from '../../../document-handling';
import { IElementSortingService, ElementSortingServiceName } from '../../../element-sorting';

import { ElementCollectionFactoryName, IElementCollectionFactory } from '../../../element-creation';

@injectable()
export class FileArrangementService implements IFileArrangemengService {
  constructor(
    @inject(ConfigurationFactoryName) private configurationFactory: IConfigurationFactory,
    @inject(ElementCollectionFactoryName) private elementCollectionFactory: IElementCollectionFactory,
    @inject(ElementSortingServiceName) private elementSortingService: IElementSortingService,
    @inject(EditorServiceName) private editorService: IEditorService,
  ) { }

  public async arrangeOnCurrentDocumentAsync(): Promise<void> {
    const activeSourceFile = this.editorService.createSourceFileFromActiveDocument();
    const elementsFromSource = this.elementCollectionFactory.createFromSourceFile(activeSourceFile);
    const configuration = await this.configurationFactory.createConfigurationAsync();

    this.elementSortingService.sortElementsByConfiguration(elementsFromSource, configuration);
    const resultText = elementsFromSource.writeAll();

    this.editorService.writeTextToActiveDocument(resultText);
  }
}
