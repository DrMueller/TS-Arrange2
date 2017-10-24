import * as vscode from 'vscode';

import { InitializationService } from './infrastructure/initialization';

export function activate(context: vscode.ExtensionContext) {
  InitializationService.initializeExtension(context);
}

export function deactivate() {
}
