function load(blueprintJSONPath) {
  const {
    instructions,
    // dissectGuide,
    groups,
    initialKeysToIgnore,
    tests,
  } = require(blueprintJSONPath);

  const registeredInstructions = loadInstructions(instructions);
  const allRegisteredKeys = Object.keys(registeredInstructions);

  return {
    groups,
    registeredInstructions,
    allRegisteredKeys,
    initialKeysToIgnore,
    tests,
  };
}

function loadInstructions(insts) {
  let result = {};
  insts.map((inst) => {
    const { key } = inst;

    result[key] = inst;
  });

  return result;
}

const loader = {
  load: _load,
};

function _load(blueprintJSONPath) {
  loader.cached = load(blueprintJSONPath);
}

module.exports = { loader };
