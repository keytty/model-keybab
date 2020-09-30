function load(blueprintJSONPath) {
  const { 
    instructions, 
    // dissectGuide, 
    group,
    // tests, 
  } = require(blueprintJSONPath);
  
  const registeredInstructions = loadInstructions(instructions);
  const allRegisteredKeys = Object.keys(registeredInstructions);

  return {
    group,
    registeredInstructions,
    allRegisteredKeys,
  }
}

function loadInstructions(insts) {
  let result = {};
  insts.map(inst => {
    const { key } = inst;

    result[key] = inst;
  })

  return result;
}

const loader = {
  load: _load
}

function _load(blueprintJSONPath) {
  loader.cached = load(blueprintJSONPath);
}

module.exports = { loader }
