import * as assert from "assert";
// import * as vscode from "vscode";
import { wrap } from "../../wrap";

describe("should correctly wrap text", () => {
  it("should wrap with one character", () => {
    const wrappedText = wrap({
      text: "test",
      pattern: ",",
      trailingChars: {
        enabled: false,
      },
    });
    const expectedText = ",test,";
    assert.equal(wrappedText, expectedText);
  });

  it("should wrap with multiple characters", () => {
    const wrappedText = wrap({
      text: "test",
      pattern: "--",
      trailingChars: {
        enabled: false,
      },
    });
    const expectedText = "--test--";
    assert.equal(wrappedText, expectedText);
  });

  describe("should wrap with correct predefined pattern", () => {
    it("should wrap with {}", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "}",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "{test}";
      assert.equal(wrappedText, expectedText);

      const wrappedText2 = wrap({
        text: "test",
        pattern: "{",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText2 = "{test}";
      assert.equal(wrappedText2, expectedText2);
    });

    it("should wrap with «»", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "»",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "«test»";
      assert.equal(wrappedText, expectedText);

      const wrappedText2 = wrap({
        text: "test",
        pattern: "«",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText2 = "«test»";
      assert.equal(wrappedText2, expectedText2);
    });

    it("should wrap with ()", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: ")",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "(test)";
      assert.equal(wrappedText, expectedText);

      const wrappedText2 = wrap({
        text: "test",
        pattern: "(",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText2 = "(test)";
      assert.equal(wrappedText2, expectedText2);
    });

    it("should wrap with []", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "]",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "[test]";
      assert.equal(wrappedText, expectedText);

      const wrappedText2 = wrap({
        text: "test",
        pattern: "[",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText2 = "[test]";
      assert.equal(wrappedText2, expectedText2);
    });

    it("should wrap with <>", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: ">",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "<test>";
      assert.equal(wrappedText, expectedText);

      const wrappedText2 = wrap({
        text: "test",
        pattern: "<",
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText2 = "<test>";
      assert.equal(wrappedText2, expectedText2);
    });
  });
});

describe("should correctly wrap based on configuration", () => {
  describe("should wrap based on trailing characters options", () => {
    it("should wrap with no trailing characters", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "*",
        multi: false,
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = "*test*";
      assert.equal(wrappedText, expectedText);
    });
    it("should wrap with trailing characters", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "*",
        multi: false,
        trailingChars: {
          enabled: true,
          characters: ",",
        },
      });
      const expectedText = "*test*,";
      assert.equal(wrappedText, expectedText);
    });
    it("should wrap with trailing characters except last line", () => {
      const inputText = ["test1", "test2"].join("\n");
      const wrappedText = wrap({
        text: inputText,
        pattern: "*",
        multi: true,
        trailingChars: {
          enabled: true,
          characters: ",",
          lastLine: false,
        },
      });
      const expectedText = ["*test1*,", "*test2*"].join("\n");
      assert.equal(wrappedText, expectedText);
    });
    it("should wrap with trailing characters including last line", () => {
      const inputText = ["test1", "test2"].join("\n");
      const wrappedText = wrap({
        text: inputText,
        pattern: "*",
        multi: true,
        trailingChars: {
          enabled: true,
          characters: ",",
          lastLine: true,
        },
      });
      const expectedText = ["*test1*,", "*test2*,"].join("\n");
      assert.equal(wrappedText, expectedText);
    });
  });

  describe("should wrap based on ignore whitespace options", () => {
    describe("should wrap based on leading whitespace options", () => {
      it("should wrap and ignore leading whitespace", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: '"',
          multi: false,
          trailingChars: {
            enabled: false
          },
          ignoreWs: {
            leading: true,
            trailing: true
          }
        });
        const expectedText = '"test"';
        assert.equal(wrappedText, expectedText);
      });
      it("should wrap and not ignore leading whitespace", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: '"',
          multi: false,
          trailingChars: {
            enabled: false,
          },
          ignoreWs: {
            leading: false,
            trailing: true,
          },
        });
        const expectedText = '" test"';
        assert.equal(wrappedText, expectedText);
      });
    });

    describe("should wrap based on ignore trailing whitespace options", () => {
      it("should wrap and ignore trailing whitespace", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: '"',
          multi: false,
          trailingChars: {
            enabled: false,
          },
          ignoreWs: {
            leading: true,
            trailing: true,
          },
        });
        const expectedText = '"test"';
        assert.equal(wrappedText, expectedText);
      });
      it("should wrap and not ignore trailing whitespace", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: '"',
          multi: false,
          trailingChars: {
            enabled: false,
          },
          ignoreWs: {
            leading: true,
            trailing: false,
          },
        });
        const expectedText = '"test "';
        assert.equal(wrappedText, expectedText);
      });
    });
  });

  describe("should wrap based on single/multiline options", () => {
    const inputText = ["test1", "test2"].join("\n");

    it("should wrap correctly for single line option", () => {
      const wrappedText = wrap({
        text: inputText,
        pattern: ",",
        multi: false,
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = [",test1", "test2,"].join("\n");
      assert.equal(wrappedText, expectedText);
    });
    it("should wrap correctly for multi line option", () => {
      const wrappedText = wrap({
        text: inputText,
        pattern: ",",
        multi: true,
        trailingChars: {
          enabled: false,
        },
      });
      const expectedText = [",test1,", ",test2,"].join("\n");
      assert.equal(wrappedText, expectedText);
    });
  });
});
