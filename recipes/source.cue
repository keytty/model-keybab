comments: [
  "This file is being generated by ./source.cue",
  "Don't edit this file by hand",
]

#digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

#digitKeys: [
  for k, v in #digits {
    key: "\(v)"
    digit: v
    groupables: ["axes"]
    keysToIgnore: ["c"]
  } 
]

#hjkl: {
  keys: ["h", "j", "k", "l"]
  xs: [-1, 0, 0, 1]
  ys: [0, -1, 1, 0]
}

group: {
  axes: {
    // maybe there is a better name than "move"? what would math people call this kind of action?
    action: "move"
    value: "axis"
    amplify: "digit"
  }
}

#hjklKeys: [
  for k, v in #hjkl.keys {
    key: v
    groupables: ["axes"]
    axis: {
      x: #hjkl.xs[k]
      y: #hjkl.ys[k]
    }
    keysToIgnore: ["c"]
  } 
]

// * visualized example *
//   x y     x y
// w 1 2 | e 2 2
// s 1 1 | d 2 1
#wesd: {
  keys: ["w", "e", "s", "d"]
  xs: [1, 2, 1, 2]
  ys: [2, 2, 1, 1]
}

#wesdKeys: [
  for k, v in #wesd.keys {
    key: v
    action: {
      type: "dissect"
      section: 2
      x: #wesd.xs[k]
      y: #wesd.ys[k]
    }
    keysToIgnore: ["c"]
  } 
]

instructions: 
  [{
    key: "c"
    action: {
      type: "center"
    }
    keysToIgnore: []
  }] + 
  #digitKeys + 
  #hjklKeys + 
  #wesdKeys

dissectGuide: {
  triggers: ["c", "w", "e", "s", "d"]
  set: ["w", "e", "s", "d"]
}

tests: {
  "ek": {
    keys: ["k"]
    instructions: [{
      action: {
        type: "move"
        x: 0
        y: 1
      }
    }]
    keysToIgnore: ["c"]
  }
  "j j j": {
    keys: ["3", "j"]
    instructions: [{
      action: {
        type: "move"
        x: 0
        y: 3
      }
    }]
    keysToIgnore: ["c"]
  }
  "c e d": {
  }
}
