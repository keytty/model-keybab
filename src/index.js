const { loader } = require("./loader.js");
const { makeGroup } = require("./group.js");
const { genActionFromKeys } = require("./action.js");
const { genOptimize, genFilterKeys } = require("./optimize.js");

loader.load(__dirname + "/../recipes/keybab.json");

const {
  registeredInstructions,
  groups: groupDef,
  initialKeysToIgnore,
} = loader.cached;

const actionFromKeys = genActionFromKeys(registeredInstructions, groupDef);

const filterKeys = genFilterKeys({
  registeredInstructions,
  initialKeysToIgnore,
});
const optimize = genOptimize(registeredInstructions);

// instruct(
//   ['c', 'w', 'j', 'c', 'j', 'j', '2', 'q']
// ) == {
//   keys: [...],
//   actions: [...],
//   keysToIgnore: [...],
//   ignoredKeyInTheEnd: 'q'
// }
function instruct(keys) {
  const { filtered, keysToIgnore, ignoredKeyInTheEnd } = filterKeys(keys);

  const grouped = makeGroup(filtered);

  const optimized = optimize(grouped);

  const finalKeys = optimized.map((g) => g.keys).flat();

  const actions = actionFromKeys(optimized);

  return {
    keys: finalKeys,
    actions,
    keysToIgnore,
    ignoredKeyInTheEnd,
  };
}

module.exports = {
  allRegisteredKeys: loader.cached.allRegisteredKeys,
  tests: loader.cached.tests,
  instruct,
};
