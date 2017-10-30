import * as assert from 'assert';
import * as moq from 'moq.ts';

import { ElementCollection } from '../../../../../src/areas/common/models';
import { Configuration, IConfigurationFactory } from '../../../../../src/areas/configuration';
import { IEditorService, ISourceFileProxy } from '../../../../../src/areas/document-handling';
import { IElementCollectionFactory } from '../../../../../src/areas/element-creation';
import { IElementSortingService } from '../../../../../src/areas/element-sorting';
import {
  FileArrangementService
} from '../../../../../src/areas/file-arrangement/services/implementation';

describe('FileArrangementService', () => {
  let sut: FileArrangementService;
  let editorServiceMock: moq.IMock<IEditorService>;
  let configurationFactoryMock: moq.IMock<IConfigurationFactory>;
  let elementCollectionFactoryMock: moq.IMock<IElementCollectionFactory>;
  let elementSortingServiceMock: moq.IMock<IElementSortingService>;
  let sourceFileProxyMock: moq.IMock<ISourceFileProxy>;

  let configuration: Configuration;
  let elementCollection: ElementCollection;
  let actualElementCollection: ElementCollection;
  let actualConfiguration: Configuration;
  let actualSourceFileProxy: ISourceFileProxy;

  beforeEach(() => {
    configuration = new Configuration([]);
    elementCollection = new ElementCollection([], '', '');

    sourceFileProxyMock = new moq.Mock<ISourceFileProxy>();
    editorServiceMock = new moq.Mock<IEditorService>().setBehaviorStrategy(moq.MockBehavior.Loose);
    editorServiceMock.setup(f => f.createSourceFileFromActiveDocument()).returns(sourceFileProxyMock.object());

    configurationFactoryMock = new moq.Mock<IConfigurationFactory>();
    configurationFactoryMock.setup(f => f.createConfigurationAsync()).returns(Promise.resolve<Configuration>(configuration));

    elementCollectionFactoryMock = new moq.Mock<IElementCollectionFactory>();
    elementCollectionFactoryMock.setup(f => f.createFromSourceFile(moq.It.IsAny<ISourceFileProxy>()))
      .callback<ElementCollection>((sd: ISourceFileProxy) => {
        actualSourceFileProxy = sd;
        return elementCollection;
      });

    elementSortingServiceMock = new moq.Mock<IElementSortingService>();
    elementSortingServiceMock.setup(f => f.sortElementsByConfiguration(
      moq.It.IsAny<ElementCollection>(),
      moq.It.IsAny<Configuration>())).callback((col: ElementCollection, config: Configuration) => {
        actualConfiguration = config;
        actualElementCollection = col;
      });

    sut = new FileArrangementService(
      configurationFactoryMock.object(),
      elementCollectionFactoryMock.object(),
      elementSortingServiceMock.object(),
      editorServiceMock.object());
  });


  describe('Calling the arrange method', () => {
    beforeEach(async () => {
      await sut.arrangeOnCurrentDocumentAsync();
    });

    it('Fetches the source file once', () => {
      editorServiceMock.verify(f => f.createSourceFileFromActiveDocument(), moq.Times.Once());
    });

    it('Fetches the configuration once', () => {
      configurationFactoryMock.verify(f => f.createConfigurationAsync(), moq.Times.Once());
    });

    describe('Fetches the elemement collection', () => {
      beforeEach(() => {
        elementCollectionFactoryMock.setup(f => f.createFromSourceFile(moq.It.IsAny<ISourceFileProxy>()));
      });

      it('Once', () => {
        elementCollectionFactoryMock.verify(f => f.createFromSourceFile(moq.It.IsAny<ISourceFileProxy>()), moq.Times.Once());
      });

      it('With the received source file proxy', () => {
        assert.ok(actualSourceFileProxy);
        const expectedSourceFileProxy = sourceFileProxyMock.object();
        assert.equal(actualSourceFileProxy, expectedSourceFileProxy);
      });
    });

    describe('Requests sorting', () => {
      it('Once', async () => {
        elementSortingServiceMock.verify(f => f.sortElementsByConfiguration(
          moq.It.IsAny<ElementCollection>(),
          moq.It.IsAny<Configuration>()), moq.Times.Once());
      });

      it('With the received Configuration', () => {
        assert.ok(actualConfiguration);
        assert.equal(actualConfiguration, configuration);
      });

      it('With the received ElementCollection', () => {
        assert.ok(elementCollection);
        assert.equal(actualElementCollection, elementCollection);
      });
    });
  });
});
