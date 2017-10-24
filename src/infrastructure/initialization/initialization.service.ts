import * as vscode from 'vscode';

import { IocInitializationService } from '../Ioc/ioc-configuration.service';
import { CommandRegistrationHandler } from './handlers';

export class InitializationService {

  public static initializeExtension(context: vscode.ExtensionContext): void {
    IocInitializationService.initialize();
    CommandRegistrationHandler.registerCommands(context);
  }
}