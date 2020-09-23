function commonGroupables(a, b) {
  if (!a || !b) return null;
  //TODO: implement
  return ['axes'];
}

function shouldContinueBeingGrouped(a, b) {
  if (a == b) return true;

  const common = commonGroupables(a, b);
  if (common && common.length > 0) return true;

  return false;
}

function bundleGroup(keys, groupables) {
  if (groupables && groupables.length > 0) {
    return {keys, groupBy: groupables[0]}
  }
  else {
    return {keys}
  }
}

// makeGroup([
//   {key: 'c'}
//   {key: 'k', groupables: ['axes']}
// ]) == [{keys: ['c']}, {keys:['k'], groupBy: 'axes'}]
function makeGroup(keys) {
  let k = keys[0];

  let groupables = k.groupables;
  let temp = [k.key];

  let grouped = [];

  for (const k of keys.slice(1)) {
    if (shouldContinueBeingGrouped(groupables, k.groupables)) {
      temp.push(k.key);
      groupables = commonGroupables(groupables, k.groupables);
    }
    else {
      grouped.push(bundleGroup(temp, groupables));

      // and prepare the temp right away
      temp = [k.key];
      groupables = k.groupables;
    }
  }

  if (temp) {
    grouped.push(bundleGroup(temp, groupables));
  }

  return grouped;
}

module.exports = { makeGroup }
