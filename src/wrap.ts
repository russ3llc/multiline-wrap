import { workspace } from "vscode";

// TODO - code is getting spaghetti-y. move things to functions, seperate single/multi
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

interface WhitespaceOptions {
  leading?: "ignore" | "delete" | "include";
  trailing?: "ignore" | "delete" | "include";
}

interface WrapOptions {
  text: string;
  pattern: string;
  multi?: boolean;
  trailingChars?: TrailingCharsOptions;
  whitespace?: WhitespaceOptions;
}

// Passing all of the options probably isnt the best design,
// but I don't know how to get unit tests working otherwise
const wrap = ({
  text,
  pattern,
  multi = null,
  trailingChars = null,
  whitespace = null,
}: WrapOptions): string => {
  const config = workspace.getConfiguration("multilineWrap");

  const leadingWs =
    whitespace?.leading ?? config.get("defaults.whitespace.leading");
  const trailingWs =
    whitespace?.trailing ?? config.get("defaults.whitespace.trailing");
  // const ignoreLeadingWs =
  //   whitespace?.leading ?? config.get("defaults.ignoreWhitespace.leading");
  // const ignoreTrailingWs =
  //   whitespace?.trailing ?? config.get("defaults.ignoreWhitespace.trailing");
  const trailingCharsEnabled =
    trailingChars?.enabled ?? config.get("defaults.trailingChars.enabled");
  const trailingCharsLastLine =
    trailingChars?.lastLine ?? config.get("defaults.trailingChars.lastLine");
  const trailingCharacters =
    trailingChars?.characters ??
    config.get("defaults.trailingChars.characters");
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

  if (multi) {
    if (leadingWs === "delete") {
      let parts = text.split("\n");
      parts = parts.map(line => line.trimStart());
      text = parts.join("\n");
    }
    if (trailingWs === "delete") {
      let parts = text.split("\n");
      parts = parts.map(line => line.trimEnd());
      text = parts.join("\n");
    }
  }

  // Remove and store whitespaces for after regex transform below
  let leadingWhitespaces = [];
  if (leadingWs === "ignore") {
    let parts = multi ? text.split("\n") : [text];
    let texts = [];
    for (const part of parts) {
      let leadingWhitespace = part.match(/^\s*/)[0] ?? "";
      leadingWhitespaces.push(leadingWhitespace);
      texts.push(part.trimStart());
    }
    text = texts.join("\n");
  }
  let trailingWhitespaces = [];
  if (trailingWs === "ignore") {
    let parts = multi ? text.split("\n") : [text];
    let texts = [];
    for (const part of parts) {
      let trailingWhitespace = part.match(/\s*$/)[0] ?? "";
      trailingWhitespace = trailingWhitespace.length ? trailingWhitespace : "";
      trailingWhitespaces.push(trailingWhitespace);
      texts.push(part.trimEnd());
    }
    text = texts.join("\n");
  }

  // Single line can just be wrapped
  if (!multi) {
    if (leadingWs === "delete") {
      text = text.trimStart();
    }
    if (trailingWs === "delete") {
      text = text.trimEnd();
    }
    let output = `${patternLeft}${text}${patternRight}`;
    if (trailingCharsEnabled) {
      output = `${output}${trailingCharacters}`;
    }
    if (leadingWs === "ignore") {
      output = `${leadingWhitespaces[0]}${output}`;
    }
    if (trailingWs === "ignore") {
      output = `${output}${trailingWhitespaces.at(-1)}`;
    }
    return output;
  }

  // Multiline uses regexp replace
  const expr = new RegExp("(.+)", "g");
  let replaceExpr: string;

  replaceExpr = trailingCharsEnabled
    ? `${patternLeft}$1${patternRight}${trailingCharacters}`
    : `${patternLeft}$1${patternRight}`;
  let output = text.replace(expr, replaceExpr);

  // Remove last trailing character if enabled
  if (trailingCharsEnabled && !trailingCharsLastLine) {
    output = output.substring(0, output.length - trailingCharacters.length);
  }

  function zip(arr1: string[], arr2: string[]) {
    let output = [];
    for (let i = 0; i < arr1.length; i++) {
      output.push(`${arr1[i]}${arr2[i]}`);
    }
    return output;
  }

  // Readd whitespace if ignored
  if (leadingWs === "ignore") {
    let parts = output.split("\n");
    output = zip(leadingWhitespaces, parts).join("\n");
  }
  if (trailingWs === "ignore") {
    let parts = output.split("\n");
    output = zip(parts, trailingWhitespaces).join("\n");
  }

  return output;
};

export { wrap };
