import assert from "power-assert";
import ObservableArray from "../src/ObservableArray";

describe("ObservableArray", () => {
  const array = new ObservableArray([1,2,3]);

  function assertChange(insertionsExpected, removalsExpected, action) {
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
      assertChange(
        [[3,[4,5]]],
        [],
        () => {
          array.push(4, 5);
        }
      )
      assert.deepEqual([...array], [1,2,3,4,5])
    });
  });
});
