import { workspace } from "vscode";

// TODO - Use matching brackets/braces ([ => [])
// TODO - Using "single" as the option in 'extension.ts' but "multiline" in configuration. Make it standard!
// TODO - Backfill wrap features - e.g. complex patterns, user patterns

const wrap = (
  text: string,
  providedPattern: string,
  single?: boolean
): string => {
  const defaultsConfig = workspace.getConfiguration("multilineWrap.defaults");
  const trailingCommasConfig = {
    enabled: defaultsConfig.get("trailingComma.enabled"),
    lastLine: defaultsConfig.get("trailingComma.lastLine"),
  };

  let pattern: string;
  if (providedPattern) {
    pattern = providedPattern;
  } else {
    const defaultPattern: string = defaultsConfig.get("pattern");
    pattern = defaultPattern.replace(/`/g, "\\`");
  }

  if (single === undefined) {
    const defaultMultiline = defaultsConfig.get("multiline");
    single = defaultMultiline ? false : true;
  }

  if (single) {
    const trailingComma = trailingCommasConfig.enabled ? "," : "";
    return `${pattern}${text}${pattern}${trailingComma}`;
  }

  const expr = new RegExp("(.+)", "g");
  const replaceExpr = trailingCommasConfig.enabled
    ? `${pattern}$1${pattern},`
    : `${pattern}$1${pattern}`;
  let output = text.replace(expr, replaceExpr);
  if (!trailingCommasConfig.lastLine && trailingCommasConfig.enabled) {
    output = output.substring(0, output.length - 1);
  }
  return output;
};

export { wrap };
