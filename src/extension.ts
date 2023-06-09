import { commands, ExtensionContext, TextEditor, window } from "vscode";
import { wrap } from "./wrap";

interface WrapOptions {
  editor: TextEditor;
  symbol?: string;
  multi?: boolean;
  trailingComma?: boolean,
  lastLineComma?: boolean
}

const wrapSelection = ({
  editor,
  symbol = null,
  multi = null,
  trailingComma = null,
  lastLineComma = null
}: WrapOptions): void => {

  const { document, selections } = editor;

  editor.edit(b => {
    selections.forEach(selection => {
      if (!selection.isEmpty) {
        const text = document.getText(selection);

        b.replace(selection, wrap({text: text, pattern: symbol, multi: multi }));
      }
    });
  });
};

export function activate(context: ExtensionContext): void {
  // Default
  context.subscriptions.push(
    commands.registerCommand("wrapSelection", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor });
    })
  );

  // Character + default (multi/single)
  context.subscriptions.push(
    commands.registerCommand("wrapSelection.doubleQuotes", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: '"' });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.singleQuote", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "'" });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.backtick", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "`" });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.frenchQuote", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "«" });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.squareBracket", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "[" });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.parentheses", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "(" });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.braces", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "{" });
    })
  );

  // Default character single
  context.subscriptions.push(
    commands.registerCommand("wrapSelection.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, multi: true });
    })
  );

  // Character + single
  context.subscriptions.push(
    commands.registerCommand("wrapSelection.doubleQuotes.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: '"', multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.singleQuote.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "'", multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.backtick.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "`", multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.frenchQuote.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "«", multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.squareBracket.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "[", multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.parentheses.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "(", multi: true });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.braces.single", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "{", multi: true });
    })
  );

  // Default character double
  context.subscriptions.push(
    commands.registerCommand("wrapSelection.double", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, multi: false });
    })
  );

  // Character + double
  context.subscriptions.push(
    commands.registerCommand("wrapSelection.doubleQuotes.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: '"', multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.singleQuote.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "'", multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.backtick.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "`", multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.frenchQuote.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "«", multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.squareBracket.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "[", multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.parentheses.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "(", multi: false });
    })
  );

  context.subscriptions.push(
    commands.registerCommand("wrapSelection.braces.multi", () => {
      const { activeTextEditor: editor } = window;
      wrapSelection({ editor: editor, symbol: "{", multi: false });
    })
  );
}
