const { tokenizeAxes } = require('./token.js');

function genActionFromKeys(registeredInstructions, groupDef) {
  // actionFromAxes({
  //   groupBy: 'axes', 
  //   keys: ['j', 'j', 'j']
  // }) === [{ type: 'move', x: 3, y: -2}]
  function actionFromAxes(group) {
    const {x, y} = tokenizeAxes(group);

    if (x === 0 && y === 0) return [];
    //FYI: axes is hard coded here
    const type = groupDef.filter(g => g.name == "axes")[0].action;

    return [{ type, x, y}];
  }

  function actionFromRest(group) {
    return group.keys.map(k => {
      return registeredInstructions[k].action
    })
  }

  function actionFromKeys(groups) {
    return groups.map(g => {
      if (g.groupBy === 'axes') return actionFromAxes(g);

      return actionFromRest(g);
    }).flat();
  }

  return actionFromKeys;
}

module.exports = { genActionFromKeys }
