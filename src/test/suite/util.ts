import { workspace } from "vscode";
// TODO - ditch this, doesnt work for testing :(
function getAllConfigOptions(baseSection: string) {
  let allOptions = [];
  function recurse(section: string) {
    const config = workspace.getConfiguration(section);
    const configProps = { ...config };
    delete configProps.has;
    delete configProps.get;
    delete configProps.update;
    delete configProps.inspect;

    const options = Object.keys(configProps).map(i => section + "." + i);
    let isLeaf = config.has !== undefined && !options.length;
    if (isLeaf) {
      allOptions.push(section);
    }
    for (const option of options) {
      recurse(option);
    }
  }
  recurse(baseSection);
  return allOptions;
}

function getAllConfigValues(
  baseSection: string
): { section: string; value: any }[] {
  const configOptions = getAllConfigOptions(baseSection);
  return configOptions.map(option => ({
    section: option,
    value: workspace
      .getConfiguration(baseSection)
      .get(option.replace(baseSection + ".", "")),
  }));
}

function restoreAllConfigValues(
  baseSection: string,
  configValues: { section: string; value: any }[]
) {
  for (const option of configValues) {
    workspace
      .getConfiguration(baseSection)
      .update(
        option.section.replace(baseSection + ".", ""),
        option.value,
        true
      );
    // workspace
    //   .getConfiguration(baseSection)
    //   .update(
    //     option.section.replace(baseSection + ".", ""),
    //     option.value
    //   );
  }
}

export { getAllConfigOptions, getAllConfigValues, restoreAllConfigValues };
