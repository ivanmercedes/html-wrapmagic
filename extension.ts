import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.htmlWrapMagic",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        vscode.window
          .showInputBox({
            prompt: "Enter the HTML tag to wrap the text (e.g., 'div'):",
          })
          .then((tagName) => {
            if (tagName) {
              const wrappedText = `<${tagName}>${selectedText}</${tagName}>`;
              editor.edit((builder) => {
                builder.replace(selection, wrappedText);
              });
            }
          });
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
