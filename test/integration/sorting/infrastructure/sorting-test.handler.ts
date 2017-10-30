import * as assert from 'assert';
import { createSourceFile, ScriptKind, ScriptTarget } from 'typescript';

import { ElementCollection } from '../../../../src/areas/common/models';
import {
    ConfigFileParserName, IConfigFileParser
} from '../../../../src/areas/configuration/services/handlers';
import { ISourceFileProxy } from '../../../../src/areas/document-handling';
import { SourceFileProxy } from '../../../../src/areas/document-handling/services/implementation';
import {
    ElementCollectionFactoryName, IElementCollectionFactory
} from '../../../../src/areas/element-creation/services';
import {
    ElementSortingServiceName, IElementSortingService
} from '../../../../src/areas/element-sorting/services';
import { IocContainerSingleton } from '../../../../src/infrastructure/Ioc';
import {
    IocInitializationService
} from '../../../../src/infrastructure/Ioc/ioc-configuration.service';

export class SortingTestingHandler {
  private readonly _configFileParser: IConfigFileParser;
  private readonly _elementSortingservice: IElementSortingService;
  private readonly _elementCollectionFactory: IElementCollectionFactory;

  constructor() {
    IocInitializationService.initialize();
    this._configFileParser = IocContainerSingleton.resolve<IConfigFileParser>(ConfigFileParserName);
    this._elementSortingservice = IocContainerSingleton.resolve<IElementSortingService>(ElementSortingServiceName);
    this._elementCollectionFactory = IocContainerSingleton.resolve<IElementCollectionFactory>(ElementCollectionFactoryName);
  }

  public assertSorting(lintConfigText: string, classText: string, expectedClassText: string): void {
    const elements = this.createAndSortElements(lintConfigText, classText);
    const actualClassText = elements.writeAll();

    assert.equal(actualClassText, expectedClassText);
  }

  private createAndSortElements(lintConfigText: string, classText: string): ElementCollection {
    const configuration = this._configFileParser.parseLintConfiguration(lintConfigText);
    const sourceFileProxy = this.createSourceFileProxy(classText);

    const elements = this._elementCollectionFactory.createFromSourceFile(sourceFileProxy);
    this._elementSortingservice.sortElementsByConfiguration(elements, configuration);

    return elements;
  }

  private createSourceFileProxy(classText: string): ISourceFileProxy {
    const sourceFile = createSourceFile('', classText, ScriptTarget.Latest, true, ScriptKind.TS);
    const result = new SourceFileProxy(sourceFile);
    return result;
  }
}
