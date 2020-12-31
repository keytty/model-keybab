const { genTokenizeAxes, tokenToKeys } = require("./token.js");

function genOptimize(registeredInstructions) {
  const tokenizeAxes = genTokenizeAxes(registeredInstructions);

  return function (groups) {
    return groups.map((g) => {
      if (g.groupBy !== "axes") return g;

      return optimizeAxesGroup(g, tokenizeAxes);
    });
  };
}

function optimizeAxesGroup(group, tokenizeAxes) {
  const tokenized = tokenizeAxes(group);

  return { ...group, keys: tokenToKeys(tokenized) };
}

function genFilterKeys(registeredInstructions) {
  function filterKeys(keys) {
    let lastKeysToIgnore = [];
    let ignoredKeyInTheEnd = null;

    const filteredKeys = keys
      .map((k) => {
        const inst = registeredInstructions[k];

        // always reset
        ignoredKeyInTheEnd = null;
        const ignored = lastKeysToIgnore.includes(k) || !inst;

        if (ignored) {
          ignoredKeyInTheEnd = k;
          return { ignored: true, key: k };
        }

        const { key, keysToIgnore, groupables } = inst;
        lastKeysToIgnore = keysToIgnore;
        return { key, ignored, groupables };
      })
      .filter((o) => !o.ignored)
      .map((o) => {
        delete o.ignored;
        return o;
      });

    return {
      filtered: filteredKeys,
      keysToIgnore: lastKeysToIgnore,
      ignoredKeyInTheEnd,
    };
  }
  return filterKeys;
}

module.exports = {
  genOptimize,
  genFilterKeys,
};
