import { workspace } from "vscode";

// TODO - fix camel case in extension settings - update, I don't remember why this is a problem
// TODO - Backfill wrap features - e.g. complex patterns, user patterns

const directionalCharacters = [
  { left: "[", right: "]" },
  { left: "(", right: ")" },
  { left: "{", right: "}" },
  { left: "«", right: "»" },
  { left: "<", right: ">" },
];

interface TrailingCharsOptions {
  enabled?: boolean;
  lastLine?: boolean;
  characters?: string;
}

interface IgnoreWhitespaceOptions {
  leading?: boolean;
  trailing?: boolean;
}

interface WrapOptions {
  text: string;
  pattern: string;
  multi?: boolean;
  trailingChars?: TrailingCharsOptions;
  ignoreWs?: IgnoreWhitespaceOptions;
}

// Passing all of the options probably isnt the best design,
// but I don't know how to get unit tests working otherwise
const wrap = ({
  text,
  pattern,
  multi = null,
  trailingChars = null,
  ignoreWs = null,
}: WrapOptions): string => {
  const config = workspace.getConfiguration("multilineWrap");

  const ignoreLeadingWs =
    ignoreWs?.leading ?? config.get("defaults.ignoreWhitespace.leading");
  const ignoreTrailingWs =
    ignoreWs?.trailing ?? config.get("defaults.ignoreWhitespace.trailing");
  const trailingCharsEnabled =
    trailingChars?.enabled ?? config.get("defaults.trailingChars.enabled");
  const trailingCharsLastLine =
    trailingChars?.lastLine ?? config.get("defaults.trailingChars.lastLine");
  const trailingCharacters =
    trailingChars?.characters ?? config.get("defaults.trailingChars.characters");
  multi = multi ?? config.get("defaults.multiline");

  const defaultPattern: string = config.get("defaults.pattern");
  pattern = pattern ?? defaultPattern.replace(/`/g, "\\`");

  let patternLeft = pattern;
  let patternRight = pattern;
  let dc = directionalCharacters.find(
    dc => dc.left === pattern || dc.right === pattern
  );
  if (dc) {
    patternLeft = dc.left;
    patternRight = dc.right;
  }

  if (ignoreLeadingWs || ignoreTrailingWs) {
    let parts = text.split("\n");
    if (ignoreLeadingWs) {
      parts = parts.map(line => line.trimStart());
    }
    if (ignoreTrailingWs) {
      parts = parts.map(line => line.trimEnd());
    }
    text = parts.join("\n");
  }

  if (!multi) {
    if (trailingCharsEnabled) {
      return `${patternLeft}${text}${patternRight}${trailingCharacters}`;
    } else {
      return `${patternLeft}${text}${patternRight}`;
    }
  }

  const expr = new RegExp("(.+)", "g");
  let replaceExpr: string;

  replaceExpr = trailingCharsEnabled
    ? `${patternLeft}$1${patternRight}${trailingCharacters}`
    : `${patternLeft}$1${patternRight}`;
  let output = text.replace(expr, replaceExpr);

  if (trailingCharsEnabled && !trailingCharsLastLine) {
    output = output.substring(0, output.length - trailingCharacters.length);
  }
  return output;
};

export { wrap };
