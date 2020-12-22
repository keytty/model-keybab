# Design of model-keybab

## Avoid repeating
- outsource details of instructions to json file
- DRY json construction from cue
- reuse json from different languages/libraries allowing minimal but customizable logics that works best for its environment
- tests input and output are builtin the the json so that these can be used for any runtimes

## Avoid being perfect
- this model itself can be forked and modified in anyway possible to suit anyone's needs
- the code will contain the minimal assumption and corresponding hard-coding about the structure of the json file

## Encourage embedding `keybab.json`
- this repo is intended to be a model of how to implement the keybab feature with json.
- the result `keybab.json` file is recommended to be embedded in runtime libraries to avoid duplication

## User customizable
Instruction per key is encoded as json. This means it can be used as a way to provide customizing keys or instructions for end-users to change however they like as long as it complies with the structure of the `keybab.json`. Verifying it should be possible with `cue eval`
