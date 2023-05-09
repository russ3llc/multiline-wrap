import { dir } from "console";
import { workspace } from "vscode";

// TODO - Use matching brackets/braces ([ => [])
// TODO - Using "single" as the option in 'extension.ts' but "multiline" in configuration. Make it standard!
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
  single?: boolean;
  trailingComma?: boolean;
  lastLineComma?: boolean;
}

const wrap = ({
  text,
  pattern,
  single = null,
  trailingComma = null,
  lastLineComma = null,
}: WrapOptions): string => {
  const config = workspace.getConfiguration("multilineWrap");

  trailingComma = trailingComma ?? config.get("defaults.trailingComma.enabled");
  lastLineComma =
    lastLineComma ?? config.get("defaults.trailingComma.lastLine");

  let patternLeft: string;
  let patternRight: string;
  if (!pattern) {
    const defaultPattern: string = config.get("defaults.pattern");
    pattern = defaultPattern.replace(/`/g, "\\`");
  }
  let dc = directionalCharacters.find(
    dc => dc.left === pattern || dc.right === pattern
  );
  if (dc) {
    patternLeft = dc.left;
    patternRight = dc.right;
  }

  if (single === undefined) {
    const defaultMultiline = config.get("defaults.multiline");
    single = defaultMultiline ? false : true;
  }

  if (single) {
    const comma = trailingComma ? "," : "";
    return `${pattern}${text}${pattern}${comma}`;
  }

  const expr = new RegExp("(.+)", "g");
  let replaceExpr: string;
  if (dc) {
    replaceExpr = trailingComma
      ? `${patternLeft}$1${patternRight},`
      : `${patternLeft}$1${patternRight}`;
  } else {
    replaceExpr = trailingComma
      ? `${pattern}$1${pattern},`
      : `${pattern}$1${pattern}`;
  }

  let output = text.replace(expr, replaceExpr);
  if (!lastLineComma && trailingComma) {
    output = output.substring(0, output.length - 1);
  }
  return output;
};

export { wrap };
