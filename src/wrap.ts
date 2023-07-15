import { workspace } from "vscode";

// TODO - fix camel case in extension settings
// TODO - Add ignoring leading whitespace
// TODO - Backfill wrap features - e.g. complex patterns, user patterns

const directionalCharacters = [
  { left: "[", right: "]" },
  { left: "(", right: ")" },
  { left: "{", right: "}" },
  { left: "«", right: "»" },
  { left: "<", right: ">" },
];

interface WrapOptions {
  text: string;
  pattern: string;
  multi?: boolean;
  trailingComma?: boolean;
  lastLineComma?: boolean;
  ignoreLeadingWs?: boolean;
  ignoreTrailingWs?: boolean;
}

// Passing all of the options probably isnt the best design,
// but I don't know how to get unit tests working otherwise
const wrap = ({
  text,
  pattern,
  multi = null,
  trailingComma = null,
  lastLineComma = null,
  ignoreLeadingWs = null,
  ignoreTrailingWs = null,
}: WrapOptions): string => {
  const config = workspace.getConfiguration("multilineWrap");

  ignoreLeadingWs =
    ignoreLeadingWs ?? config.get("defaults.ignoreWhitespace.leading");
  ignoreTrailingWs = ignoreTrailingWs ?? config.get("defaults.ignoreWhitespace.trailing");
  trailingComma = trailingComma ?? config.get("defaults.trailingComma.enabled");
  lastLineComma =
    lastLineComma ?? config.get("defaults.trailingComma.lastLine");
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
    const comma = trailingComma ? "," : "";
    return `${patternLeft}${text}${patternRight}${comma}`;
  }

  const expr = new RegExp("(.+)", "g");
  let replaceExpr: string;

  replaceExpr = trailingComma
    ? `${patternLeft}$1${patternRight},`
    : `${patternLeft}$1${patternRight}`;

  let output = text.replace(expr, replaceExpr);
  if (!lastLineComma && trailingComma) {
    output = output.substring(0, output.length - 1);
  }
  return output;
};

export { wrap };
