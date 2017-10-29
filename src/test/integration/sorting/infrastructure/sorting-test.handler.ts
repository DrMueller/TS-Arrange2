import * as assert from 'assert';
import { createSourceFile, ScriptTarget, ScriptKind } from 'typescript';

import { ElementCollection } from '../../../../app/areas/common/models';
import {
  ConfigFileParserName, IConfigFileParser
} from '../../../../app/areas/configuration/services/handlers';
import { SourceFileProxy } from '../../../../app/areas/document-handling/services/implementation';
import {
  ElementCollectionFactoryName, IElementCollectionFactory
} from '../../../../app/areas/element-creation/services';
import {
  ElementSortingServiceName, IElementSortingService
} from '../../../../app/areas/element-sorting/services';
import { IocContainerSingleton } from '../../../../app/infrastructure/Ioc';
import {
  IocInitializationService
} from '../../../../app/infrastructure/Ioc/ioc-configuration.service';

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
    const sourceFile = createSourceFile('', classText, ScriptTarget.Latest, true, ScriptKind.TS);
    const sourceFileProxy = new SourceFileProxy(sourceFile);

    const elements = this._elementCollectionFactory.createFromSourceFile(sourceFileProxy);
    this._elementSortingservice.sortElementsByConfiguration(elements, configuration);

    return elements;
  }
}