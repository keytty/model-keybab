const { genTokenizeAxes } = require("./token.js");

// actionFromAxes({
//   groupBy: 'axes',
//   keys: ['j', 'j', 'j']
// }, groupDef) === [{ type: 'move', x: 3, y: -2}]
//
function actionFromAxes(group, groupDef, tokenizeAxes) {
  const { x, y } = tokenizeAxes(group);

  if (x === 0 && y === 0) return [];
  //FYI: axes is hard coded here
  const type = groupDef.filter((g) => g.name == "axes")[0].action;

  return [{ type, x, y }];
}

function actionFromRest(group, registeredInstructions) {
  return group.keys.map((k) => {
    return registeredInstructions[k].action;
  });
}

function actionFromKeys(groups, registeredInstructions, groupDef) {
  const tokenizeAxes = genTokenizeAxes(registeredInstructions);
  return groups
    .map((g) => {
      if (g.groupBy === "axes")
        return actionFromAxes(g, groupDef, tokenizeAxes);

      return actionFromRest(g, registeredInstructions);
    })
    .flat();
}

function genActionFromKeys(registeredInstructions, groupDef) {
  return function (groups) {
    return actionFromKeys(groups, registeredInstructions, groupDef);
  };
}

module.exports = { genActionFromKeys };
