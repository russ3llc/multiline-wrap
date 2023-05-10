# Multiline Wrap

This plugin allows you to wrap multiline selections, treating each line as it's own selection.

## Usage

Select something → <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>P</kbd> → «Wrap selected text»

or

press <kbd>'</kbd>, <kbd>"</kbd>, <kbd>«</kbd>, <kbd>]</kbd>, or <kbd>)</kbd> — both opening or closing symbol would work. Or use <kbd>cmd</kbd>+<kbd>shift</kbd>+<kbd>"</kbd> to wrap with a defualt character of your choice (in extension options).

![features](https://github.com/russ3llc/multiline-wrap/raw/main/static/demo.gif)

Also in extension options:
- Default multiline wrap
- Include trailing commas
- Include trailing comma on last line
- Enable/disable keybindings

## Planned future features
- Option to ignore leading whitespace.
- More advanced patterns.
- Custom patterns.
- Prove P = NP.

## What's the point?
>Can't you alredy use multiple cursors to wrap lines with quotes?

Yes. You can also use RegExp find & replace to achieve something similar.

I created this extension for my own use case, which involves copying (sometimes tens/hundreds of) thousands of GUIDs e.g. from a spreadsheet, and using them in Javascript scripts (Javascripts?). So I spent some hours making this, to save myself some minutes. :)

## Acknowledgments

This extension is very much inspired and based on Konstantin Gorodinskiy's extension, "[Wrap Selection](https://marketplace.visualstudio.com/items?itemName=konstantin.wrapSelection)". If you like this extension, go give their extension a start on [GitHub](https://github.com/gko/wrap).

Also, thank you to the AI chatbot who helped me complete the unit test.

## Found a bug? Request a feature?
Submit an issue (or Pull Request) on [GitHub](https://github.com/russ3llc/multiline-wrap).