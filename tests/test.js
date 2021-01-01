const { instruct, tests } = require("../src/index.js");
const { inspect } = require("util");

tests.forEach((t) => {
  const { inputKeys, processedKeys } = t;
  const title = inspect(inputKeys);

  //TODO: also compare with actions and others in test not only keys
  test(title, () => {
    expect(instruct(inputKeys).keys).toStrictEqual(processedKeys);
  });
});
