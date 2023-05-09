import * as assert from "assert";
import * as vscode from "vscode";
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
});