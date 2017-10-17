import * as vscode from 'vscode';

import { IocInitializationService } from './infrastructure/Ioc/ioc-configuration.service';

import { IocContainerSingleton } from './infrastructure/Ioc';

import { ISourceFileFactory, SourceFileFactoryName } from './file-arrangement/services';

// import { AstProvider } from './file-arrangement/services';

export class CommandRegistrator {
  public registerAllCommands(context: vscode.ExtensionContext): void {
    IocInitializationService.initialize();

    const tra = IocContainerSingleton.resolve<ISourceFileFactory>(SourceFileFactoryName);
    const t = tra.createFromActiveWindow();
  }
}
