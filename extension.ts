import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.htmlWrapMagic",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selections = editor.selections;
        const selectedTexts = selections.map(selection => editor.document.getText(selection));

        vscode.window
          .showInputBox({
            prompt: "Enter the HTML tag to wrap the text (e.g., 'div'):",
          })
          .then((tagNames) => {
            if (tagNames) {
              const tags = tagNames.split(",").map((tag) => tag.trim());
              const wrappedTexts = selectedTexts.map((text, index) => {
                const tagName = tags[index % tags.length];
                return `<${tagName}>${text}</${tagName}>`;
              });
              editor.edit((builder) => {
                selections.forEach((selection, index) => {
                  builder.replace(selection, wrappedTexts[index]);
                });
              });
            }
          });
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
