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
}

// Passing all of the options probably isnt the best design,
// but I don't know how to get unit tests working otherwise
const wrap = ({
  text,
  pattern,
  multi = null,
  trailingComma = null,
  lastLineComma = null,
  trailingWs = null,
  leadingSs = null
}: WrapOptions): string => {
  const config = workspace.getConfiguration("multilineWrap");

  trailingComma = trailingComma ?? config.get("defaults.trailingComma.enabled");
  lastLineComma =
    lastLineComma ?? config.get("defaults.trailingComma.lastLine");
  trailingWs = trailingWs ?? config.get("defaults.trailingWs.enabled");
  leadingWs = leadingWs ?? config.get("defaults.leadingWs.enabled");
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
  
  if (leadingWs) {
    text = text.trimStart()
  }
  
  if (trailingWs) {
    text = text.trimEnd()
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
