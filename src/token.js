
// tokenizeAxes({
//   groupBy: 'axes', 
//   keys: ['j', 'j', 'j']
// }) == {
//   x: 3, 
//   y: -2, 
//   numberCache:3, 
//   lastAxis: xAxis
// }
function tokenizeAxes(group) {
  const xAxis = 1;
  const yAxis = 2;
  return group.keys.reduce(k => {
    k;
    //TODO: implement

    return {x: 3, y: -2, numberCache:3, lastAxis: xAxis}
  }, {x: 0, y: 0, numberCache: 0, lastAxis: yAxis});
}

// tokenToKeys({
//   x: 3, 
//   y: -2, 
//   numberCache:3, 
//   lastAxis: xAxis
// }) === ['2', 'j', '3', 'l', '3']
// convert this to test code with https://github.com/jhnns/rewire
function tokenToKeys(token) {
  //TODO: dry
  const xAxis = 1;
  // const yAxis = 2;

  const {x, y, numberCache, lastAxis} = token
  const v = (function (y){
    if (!y) return [];
    //TODO: don't assume k and calc from loaded json
    return y > 0 ? [...numberToKeys(y), 'k'] : [...numberToKeys(-1 * y), 'j'];
  })(y);

  const h = (function (x){
    if (!y) return [];
    //TODO: don't assume k and calc from loaded json
    return x > 0 ? [...numberToKeys(x), 'l'] : [...numberToKeys(-1 * x), 'h'];
  })(x);

  const most = lastAxis == xAxis ? [...v, ...h] : [...h, ...v];

  return numberCache ? [...most, ...(numberToKeys(numberCache))] : most;
}

function numberToKeys(n) {
  const str = "" + n;
  return str.split('')
}

module.exports = {
  tokenToKeys,
  tokenizeAxes
}
