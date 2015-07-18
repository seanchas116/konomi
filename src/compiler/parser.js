module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { Start: peg$parseStart },
        peg$startRuleFunction  = peg$parseStart,

        peg$c0 = [],
        peg$c1 = /^[ \t]/,
        peg$c2 = { type: "class", value: "[ \\t]", description: "[ \\t]" },
        peg$c3 = "\r\n",
        peg$c4 = { type: "literal", value: "\r\n", description: "\"\\r\\n\"" },
        peg$c5 = "\n",
        peg$c6 = { type: "literal", value: "\n", description: "\"\\n\"" },
        peg$c7 = "\r",
        peg$c8 = { type: "literal", value: "\r", description: "\"\\r\"" },
        peg$c9 = peg$FAILED,
        peg$c10 = void 0,
        peg$c11 = { type: "any", description: "any character" },
        peg$c12 = function(c) {
            return c;
          },
        peg$c13 = /^[a-zA-Z_]/,
        peg$c14 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c15 = function(chars) {
            return chars.join("");
          },
        peg$c16 = "<",
        peg$c17 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c18 = ">",
        peg$c19 = { type: "literal", value: ">", description: "\">\"" },
        peg$c20 = function(name) {
          console.log("definition name");
          return name;
        },
        peg$c21 = null,
        peg$c22 = function(name, children) {
            return {
              type: "definition",
              name: name,
              children: children
            }
          },
        peg$c23 = function(content, children) {
            return {
              type: "raw",
              content: content,
              indent: lastIndent(),
              children: children || []
            };
          },
        peg$c24 = function(lines) {
            return lines;
          },
        peg$c25 = function(children) {
            return children;
          },
        peg$c26 = ".",
        peg$c27 = { type: "literal", value: ".", description: "\".\"" },
        peg$c28 = "@",
        peg$c29 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c30 = "id",
        peg$c31 = { type: "literal", value: "id", description: "\"id\"" },
        peg$c32 = function(name) {
            return {
              type: "id",
              name: name
            };
          },
        peg$c33 = "repeat",
        peg$c34 = { type: "literal", value: "repeat", description: "\"repeat\"" },
        peg$c35 = "with",
        peg$c36 = { type: "literal", value: "with", description: "\"with\"" },
        peg$c37 = function(key) { return key; },
        peg$c38 = "of",
        peg$c39 = { type: "literal", value: "of", description: "\"of\"" },
        peg$c40 = function(name, key, expr, children) {
            return {
              type: "repeat",
              key,
              name,
              expr,
              children: children || []
            };
          },
        peg$c41 = ":",
        peg$c42 = { type: "literal", value: ":", description: "\":\"" },
        peg$c43 = function(name, expr) {
            return {
              type: "property",
              expr: expr
            };
          },
        peg$c44 = function(directive) {
            return directive;
          },
        peg$c45 = function(expr, children) {
            return {
              type: "element",
              expr: expr,
              children: children || []
            };
          },
        peg$c46 = function(ws) {
            return {
              type: "blank",
              raw: ws.join("")
            };
          },
        peg$c47 = function(whites) {
            return whites.length === lastIndent();
          },
        peg$c48 = function(whites) {
              return whites.length > lastIndent();
            },
        peg$c49 = function(whites) {
              indentStack.push(whites.length);
            },
        peg$c50 = function() {
            indentStack.pop();
          },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parseStart() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseBlankLine();
      if (s1 === peg$FAILED) {
        s1 = peg$parseDefinitionLine();
        if (s1 === peg$FAILED) {
          s1 = peg$parseRawLine();
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseBlankLine();
        if (s1 === peg$FAILED) {
          s1 = peg$parseDefinitionLine();
          if (s1 === peg$FAILED) {
            s1 = peg$parseRawLine();
          }
        }
      }

      return s0;
    }

    function peg$parseWhitespace() {
      var s0;

      if (peg$c1.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }

      return s0;
    }

    function peg$parseLinebreak() {
      var s0;

      if (input.substr(peg$currPos, 2) === peg$c3) {
        s0 = peg$c3;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s0 = peg$c5;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c6); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s0 = peg$c7;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
        }
      }

      return s0;
    }

    function peg$parseNonLinebreak() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseLinebreak();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c10;
      } else {
        peg$currPos = s1;
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c11); }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c12(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseWhitespace();
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseWhitespace();
      }

      return s0;
    }

    function peg$parseIdentifier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c13.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c13.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
        }
      } else {
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c15(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseDefinitionName() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c16;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdentifier();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s4 = peg$c18;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c19); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c20(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c9;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseDefinitionLine() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseIndentKeep();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseDefinitionName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLinebreak();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseChildren();
            if (s4 === peg$FAILED) {
              s4 = peg$c21;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseRawLine() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseIndentKeep();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseRawText();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLinebreak();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseRawChildren();
            if (s4 === peg$FAILED) {
              s4 = peg$c21;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c23(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseRawLines() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseBlankLine();
      if (s2 === peg$FAILED) {
        s2 = peg$parseRawLine();
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseBlankLine();
        if (s2 === peg$FAILED) {
          s2 = peg$parseRawLine();
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c24(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseRawChildren() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseBlankLine();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseBlankLine();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIndentDown();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseRawLines();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseIndentUp();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c25(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseRawBlock() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLinebreak();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseRawChildren();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c25(s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseRawText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseNonLinebreak();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseNonLinebreak();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c15(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseElementExpr() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 64) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = peg$c10;
      } else {
        peg$currPos = s1;
        s1 = peg$c9;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseNonLinebreak();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseNonLinebreak();
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c15(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseIdDirective() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c30) {
        s1 = peg$c30;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdentifier();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseLinebreak();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c32(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseRepeatDirective() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c33) {
        s1 = peg$c33;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdentifier();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            if (input.substr(peg$currPos, 4) === peg$c35) {
              s5 = peg$c35;
              peg$currPos += 4;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c36); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parse_();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseIdentifier();
                if (s7 !== peg$FAILED) {
                  peg$reportedPos = s4;
                  s5 = peg$c37(s7);
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c9;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c9;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c9;
            }
            if (s4 === peg$FAILED) {
              s4 = peg$c21;
            }
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c38) {
                s5 = peg$c38;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c39); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseRawText();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseLinebreak();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseChildren();
                      if (s9 === peg$FAILED) {
                        s9 = peg$c21;
                      }
                      if (s9 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c40(s3, s4, s7, s9);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c9;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c9;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c9;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c9;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c9;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parsePropertyLine() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseIndentKeep();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIdentifier();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c41;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseRawBlock();
              if (s5 === peg$FAILED) {
                s5 = peg$parseRawText();
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c43(s2, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c9;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseDirectiveLine() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseIndentKeep();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 64) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c29); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseIdDirective();
          if (s3 === peg$FAILED) {
            s3 = peg$parseRepeatDirective();
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c44(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseElementLine() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseIndentKeep();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseElementExpr();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLinebreak();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseChildren();
            if (s4 === peg$FAILED) {
              s4 = peg$c21;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c45(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseLines() {
      var s0, s1;

      s0 = [];
      s1 = peg$parseBlankLine();
      if (s1 === peg$FAILED) {
        s1 = peg$parsePropertyLine();
        if (s1 === peg$FAILED) {
          s1 = peg$parseDirectiveLine();
          if (s1 === peg$FAILED) {
            s1 = peg$parseElementLine();
          }
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        s1 = peg$parseBlankLine();
        if (s1 === peg$FAILED) {
          s1 = peg$parsePropertyLine();
          if (s1 === peg$FAILED) {
            s1 = peg$parseDirectiveLine();
            if (s1 === peg$FAILED) {
              s1 = peg$parseElementLine();
            }
          }
        }
      }

      return s0;
    }

    function peg$parseChildren() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseBlankLine();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseBlankLine();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIndentDown();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseLines();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseIndentUp();
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c25(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c9;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c9;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseBlankLine() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseLinebreak();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c46(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseIndentKeep() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = peg$currPos;
        s2 = peg$c47(s1);
        if (s2) {
          s2 = peg$c10;
        } else {
          s2 = peg$c9;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c9;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseIndentDown() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      peg$silentFails++;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parseWhitespace();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseWhitespace();
        }
      } else {
        s2 = peg$c9;
      }
      if (s2 !== peg$FAILED) {
        peg$reportedPos = peg$currPos;
        s3 = peg$c48(s2);
        if (s3) {
          s3 = peg$c10;
        } else {
          s3 = peg$c9;
        }
        if (s3 !== peg$FAILED) {
          peg$reportedPos = s1;
          s2 = peg$c49(s2);
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c9;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c9;
      }
      peg$silentFails--;
      if (s1 !== peg$FAILED) {
        peg$currPos = s0;
        s0 = peg$c10;
      } else {
        s0 = peg$c9;
      }

      return s0;
    }

    function peg$parseIndentUp() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = [];
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c50();
      }
      s0 = s1;

      return s0;
    }


      const indentStack = [0];
      function lastIndent() {
        return indentStack[indentStack.length - 1];
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
