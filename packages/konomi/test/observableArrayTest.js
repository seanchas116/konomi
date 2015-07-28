import assert from "power-assert";
import ObservableArray from "../src/ObservableArray";

describe("ObservableArray", () => {

  function assertChange(array, insertionsExpected, removalsExpected, action) {
    const insertions = [];
    const removals = [];
    const onInsert = (i, xs) => {
      insertions.push([i, xs]);
    };
    const onRemove = (i, xs) => {
      removals.push([i, xs]);
    };

    array.on("insert", onInsert);
    array.on("remove", onRemove);

    action();

    array.removeListener("insert", onInsert);
    array.removeListener("remove", onRemove);

    assert.deepEqual(insertions, insertionsExpected);
    assert.deepEqual(removals, removalsExpected);
  }

  describe("#push", () => {
    it("pushes value", () => {
      const array = new ObservableArray([1,2,3]);

      assertChange(
        array,
        [[3,[4,5]]],
        [],
        () => {
          array.push(4, 5);
        }
      )
      assert.deepEqual([...array], [1,2,3,4,5])
    });
  });
  describe("#pop", () => {
    it("pops value", () => {
      const array = new ObservableArray([1,2,3]);

      let popped;
      assertChange(
        array,
        [],
        [[2, [3]]],
        () => {
          popped = array.pop();
        }
      )
      assert(popped === 3);
    });
  });
});
