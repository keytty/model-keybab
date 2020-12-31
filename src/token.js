const xAxis = 1;
const yAxis = 2;

// tokenizeAnAxis('k', xAxis)
// == {
//   x: 0,
//   y: 1,
//   numberCache:0,
//   lastAxis: yAxis
// }
function tokenizeAnAxis(key, lastAxis, registeredInstructions) {
  let x = 0;
  let y = 0;
  let numberCache = 0;

  const inst = registeredInstructions[key];

  const digit = inst.digit;
  const axis = inst.axis;

  if (digit !== undefined) {
    numberCache = digit;
  }

  if (axis !== undefined) {
    x = axis.x;
    y = axis.y;

    if (x !== 0) {
      lastAxis = xAxis;
    } else if (y !== 0) {
      lastAxis = yAxis;
    }
  }

  return { x, y, numberCache, lastAxis };
}

// tokenizeAxes({
//   groupBy: 'axes',
//   keys: ['j', 'j', 'j']
// }) == {
//   x: 0,
//   y: -3,
//   numberCache:0,
//   lastAxis: yAxis
// }
//
function genTokenizeAxes(registeredInstructions) {
  return function (group) {
    return group.keys.reduce(
      (acc, key) => {
        let { x, y, numberCache, lastAxis } = acc;

        let result = tokenizeAnAxis(key, lastAxis, registeredInstructions);

        if (result.x || result.y) {
          x = x + result.x * (numberCache || 1);
          y = y + result.y * (numberCache || 1);
          numberCache = 0;
        } else if (result.numberCache !== 0) {
          numberCache = numberCache * 10 + result.numberCache;
        }

        lastAxis = result.lastAxis;

        return { x, y, numberCache, lastAxis };
      },
      { x: 0, y: 0, numberCache: 0, lastAxis: yAxis }
    );
  };
}

// tokenToKeys({
//   x: 3,
//   y: -2,
//   numberCache:3,
//   lastAxis: xAxis
// }) === ['2', 'j', '3', 'l', '3']
// convert this to test code with https://github.com/jhnns/rewire
function tokenToKeys(token) {
  const { x, y, numberCache, lastAxis } = token;

  const v = (function (y) {
    if (!y) return [];
    //TODO: don't assume k and calc from loaded json
    return y > 0 ? [...numberToKeys(y), "k"] : [...numberToKeys(-1 * y), "j"];
  })(y);

  const h = (function (x) {
    if (!x) return [];
    //TODO: don't assume k and calc from loaded json
    return x > 0 ? [...numberToKeys(x), "l"] : [...numberToKeys(-1 * x), "h"];
  })(x);

  const most = lastAxis == xAxis ? [...h, ...v] : [...v, ...h];

  return numberCache ? [...most, ...numberToKeys(numberCache)] : most;
}

function numberToKeys(n) {
  const str = "" + n;
  return str.split("");
}

module.exports = {
  tokenToKeys,
  genTokenizeAxes,
};
