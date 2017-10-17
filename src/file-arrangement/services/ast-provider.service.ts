// import * as vscode from 'vscode';
// import * as ts from 'typescript';

// export const OPEN_SELECTION_COMMAND_ID = 'typescript-ast-explorer.openAstSelection';

// export class AstProvider {
//   private _onDidChangeTreeData: vscode.EventEmitter<ts.Node | null> = new vscode.EventEmitter<ts.Node | null>();
//   public readonly onDidChangeTreeData: vscode.Event<ts.Node | null> = this._onDidChangeTreeData.event;

//   private tree: ts.Node | undefined;
//   private editor: vscode.TextEditor | undefined;

//   constructor() {
//     vscode.window.onDidChangeActiveTextEditor(editor => {
//       this.parseTree();
//       this._onDidChangeTreeData.fire();
//     });

//     this.parseTree();
//   }

//   public parseTree(): void {
//     this.tree = undefined;
//     this.editor = undefined;
//     const editor = vscode.window.activeTextEditor;
//     debugger;
//     if (editor && editor.document && editor.document.languageId === 'typescript') {
//       const source = this.createSourceFileFromActiveEditor();
//       if (source) {
//         this.tree = source.sourceFile;
//         this.editor = source.editor;
//         this.tra();
//       }
//     }
//   }

//   private tra(): void {
//     this.tree!.forEachChild(f => {
//     });
//   }

//   private getTreeItem(element: ts.Node): vscode.TreeItem | Thenable<vscode.TreeItem> {
//     const children = this.getChildren(element) as ts.Node[];
//     const hasChildren = children && children.length > 0;
//     const it = new vscode.TreeItem(`${ts.SyntaxKind[element.kind]} (${element.getStart()}, ${element.getEnd()})`,
//       hasChildren ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
//     it.command = {
//       command: OPEN_SELECTION_COMMAND_ID,
//       title: '',
//       arguments: [new vscode.Range(this.editor!.document.positionAt(element.pos), this.editor!.document.positionAt(element.end))]
//     };

//     return it;
//   }

//   private getChildren(element?: ts.Node): vscode.ProviderResult<ts.Node[]> {
//     const children = element ? this.childrenOf(element) : this.tree ? this.childrenOf(this.tree) : [];
//     return children.length === 0 ? undefined : children;
//   }

//   private childrenOf(node: ts.Node): ts.Node[] {
//     const result = new Array<ts.Node>();
//     ts.forEachChild(node, subNode => {
//       result.push(subNode);
//     });

//     return result;
//   }

// }
