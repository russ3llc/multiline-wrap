import * as assert from "assert";
// import * as vscode from "vscode";
import { wrap } from "../../wrap";

function wrapTests(useComma: boolean) {
  describe("should correctly wrap text", () => {
    it("should wrap with one character", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: ",",
        trailingComma: useComma,
      });
      const expectedText = useComma ? ",test,," : ",test,";
      assert.equal(wrappedText, expectedText);
    });

    it("should wrap with multiple characters", () => {
      const wrappedText = wrap({
        text: "test",
        pattern: "--",
        trailingComma: useComma,
      });
      const expectedText = useComma ? "--test--," : "--test--";
      assert.equal(wrappedText, expectedText);
    });

    describe("should wrap with correct predefined pattern", () => {
      it("should wrap with {}", () => {
        const wrappedText = wrap({
          text: "test",
          pattern: "}",
          trailingComma: useComma,
        });
        const expectedText = useComma ? "{test}," : "{test}";
        assert.equal(wrappedText, expectedText);

        const wrappedText2 = wrap({
          text: "test",
          pattern: "{",
          trailingComma: useComma,
        });
        const expectedText2 = useComma ? "{test}," : "{test}";
        assert.equal(wrappedText2, expectedText2);
      });

      it("should wrap with «»", () => {
        const wrappedText = wrap({
          text: "test",
          pattern: "»",
          trailingComma: useComma,
        });
        const expectedText = useComma ? "«test»," : "«test»";
        assert.equal(wrappedText, expectedText);

        const wrappedText2 = wrap({
          text: "test",
          pattern: "«",
          trailingComma: useComma,
        });
        const expectedText2 = useComma ? "«test»," : "«test»";
        assert.equal(wrappedText2, expectedText2);
      });

      it("should wrap with ()", () => {
        const wrappedText = wrap({
          text: "test",
          pattern: ")",
          trailingComma: useComma,
        });
        const expectedText = useComma ? "(test)," : "(test)";
        assert.equal(wrappedText, expectedText);

        const wrappedText2 = wrap({
          text: "test",
          pattern: "(",
          trailingComma: useComma,
        });
        const expectedText2 = useComma ? "(test)," : "(test)";
        assert.equal(wrappedText2, expectedText2);
      });

      it("should wrap with []", () => {
        const wrappedText = wrap({
          text: "test",
          pattern: "]",
          trailingComma: useComma,
        });
        const expectedText = useComma ? "[test]," : "[test]";
        assert.equal(wrappedText, expectedText);

        const wrappedText2 = wrap({
          text: "test",
          pattern: "[",
          trailingComma: useComma,
        });
        const expectedText2 = useComma ? "[test]," : "[test]";
        assert.equal(wrappedText2, expectedText2);
      });

      it("should wrap with <>", () => {
        const wrappedText = wrap({
          text: "test",
          pattern: ">",
          trailingComma: useComma,
        });
        const expectedText = useComma ? "<test>," : "<test>";
        assert.equal(wrappedText, expectedText);

        const wrappedText2 = wrap({
          text: "test",
          pattern: "<",
          trailingComma: useComma,
        });
        const expectedText2 = useComma ? "<test>," : "<test>";
        assert.equal(wrappedText2, expectedText2);
      });
    });
  });

  // Coming soon... maybe
  // describe("should wrap with more complex pattern", () => {
  //   it("should wrap with <!--", () => {
  //     assert.equal(wrap("test", "<!--"), "<!--test--!>");
  //     assert.equal(wrap("test", "--!>"), "<!--test--!>");
  //   });

  //   it("should wrap with {{}}", () => {
  //     assert.equal(wrap("test", "{{"), "{{test}}");
  //     assert.equal(wrap("test", "}}"), "{{test}}");
  //   });

  //   it("should wrap with {{{ }}}", () => {
  //     assert.equal(wrap("test", "{{{"), "{{{test}}}");
  //     assert.equal(wrap("test", "}}}"), "{{{test}}}");
  //   });

  //   it("should wrap with <%%>", () => {
  //     assert.equal(wrap("test", "<%"), "<%test%>");
  //     assert.equal(wrap("test", "%>"), "<%test%>");
  //   });

  //   it("should wrap with {%%}", () => {
  //     assert.equal(wrap("test", "{%"), "{%test%}");
  //     assert.equal(wrap("test", "%}"), "{%test%}");
  //   });
  // });

  // describe("should correctly wrap with custom pattern", () => {
  //   it("wrap with log pattern", () => {
  //     const wrappedText = wrap("test", "log");
  //     assert.equal(wrappedText, "console.log(`test`, test)");
  //   });

  //   it("wrap with promise pattern", () => {
  //     const wrappedText = wrap("test", "promise");
  //     assert.equal(wrappedText, "new Promise((yeah, nah) => yeah(test))");
  //   });
  // });
  // });
}

describe("wrap", () => {
  describe("should wrap correctly without trailing commas", () => {
    wrapTests(false);
  });

  describe("should wrap correctly with trailing commas", () => {
    wrapTests(true);
  });

  describe("should wrap correctly for ignore whitespace options", () => {
    describe("should wrap correctly for ignore leading whitespace option", () => {
      it("should wrap correctly for ignore leading whitespace enabled", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: "\"",
          multi: false,
          trailingComma: true,
          ignoreLeadingWs: true,
          ignoreTrailingWs: true,
        });
        const expectedText = '"test",';
        assert.equal(wrappedText, expectedText);
      });

      it("should wrap correctly for ignore leading whitespace disabled", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: '"',
          multi: false,
          trailingComma: true,
          ignoreLeadingWs: false,
          ignoreTrailingWs: true,
        });
        const expectedText = '" test",';
        assert.equal(wrappedText, expectedText);
      });
    });

    describe("should wrap correctly for ignore trailing whitespace option", () => {
      it("should wrap correctly for ignore trailing whitespace enabled", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: "\"",
          multi: false,
          trailingComma: true,
          ignoreLeadingWs: true,
          ignoreTrailingWs: true,
        });
        const expectedText = '"test",';
        assert.equal(wrappedText, expectedText);
      });

      it("should wrap correctly for ignore trailing whitespace disabled", () => {
        const wrappedText = wrap({
          text: " test ",
          pattern: "\"",
          multi: false,
          trailingComma: true,
          ignoreLeadingWs: true,
          ignoreTrailingWs: false,
        });
        const expectedText = '"test ",';
        assert.equal(wrappedText, expectedText);
      });
    });
  });

  describe("should wrap correctly for single/multiline options", () => {
    const inputText = ["test1", "test2"].join("\n");

    it("should wrap correctly for single line option", () => {
      const wrappedText = wrap({
        text: inputText,
        pattern: ",",
        multi: false,
        trailingComma: false,
      });
      const expectedText = [",test1", "test2,"].join("\n");
      assert.equal(wrappedText, expectedText);
    });

    it("should wrap correctly for multi line option", () => {
      const wrappedText = wrap({
        text: inputText,
        pattern: ",",
        multi: true,
        trailingComma: false,
      });
      const expectedText = [",test1,", ",test2,"].join("\n");
      assert.equal(wrappedText, expectedText);
    });
  });

  describe("should wrap correctly for last line trailing comma options", () => {
    it("should wrap correctly without last line comma", () => {
      const inputText = ["test1", "test2"].join("\n");

      it("should wrap correctly for last comma option", () => {
        const wrappedText = wrap({
          text: inputText,
          pattern: ",",
          multi: false,
          trailingComma: true,
          lastLineComma: true,
        });
        const expectedText = [",test1", "test2,"].join("\n");
        assert.equal(wrappedText, expectedText);
      });

      it("should wrap correctly for no last comma option", () => {
        const wrappedText = wrap({
          text: inputText,
          pattern: ",",
          multi: false,
          trailingComma: true,
          lastLineComma: false,
        });
        const expectedText = [",test1", "test2"].join("\n");
        assert.equal(wrappedText, expectedText);
      });
    });
  });
});
