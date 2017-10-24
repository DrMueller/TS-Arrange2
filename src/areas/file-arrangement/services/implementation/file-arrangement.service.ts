import { inject, injectable } from 'inversify';

import { IFileArrangemengService } from '..';
import { ConfigurationFactoryName, IConfigurationFactory } from '../../../configuration';
import { EditorServiceName, IEditorService } from '../../../document-handling';
import { ISortingHandler, SortingHandlerName } from '../handlers';

import { ElementCollectionFactoryName, IElementCollectionFactory } from '../../../element-creation';

@injectable()
export class FileArragementService implements IFileArrangemengService {
  constructor(
    @inject(ConfigurationFactoryName) private configurationFactory: IConfigurationFactory,
    @inject(ElementCollectionFactoryName) private elementCollectionFactory: IElementCollectionFactory,
    @inject(SortingHandlerName) private sortingHandler: ISortingHandler,
    @inject(EditorServiceName) private editorService: IEditorService,
  ) { }

  public async arrangeOnCurrentDocumentAsync(): Promise<void> {
    const activeSourceFile = this.editorService.createSourceFileFromActiveDocument();
    const elements = this.elementCollectionFactory.createFromSourceFile(activeSourceFile);
    const configuration = await this.configurationFactory.createConfigurationAsync();

    this.sortingHandler.sortElementsByConfiguration(elements, configuration);
    
    const resultText = elements.writeAll();

    debugger;
    this.editorService.writeTextToActiveDocument(resultText);
  }
}
