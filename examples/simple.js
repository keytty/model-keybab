const { instruct } = require("../src/index.js");

const instructions = ["c", "w", "j", "c", "j", "j", "2", "q"];
const shouldBe = ["c", "w", "3", "j", "2"];

console.log("ran `instruct(", ["c", "w", "j", "c", "j", "j", "2", "q"], ")`");
console.log("\nresult:");
console.dir(instruct(instructions));

console.log("\nkeys should be:");
console.dir(shouldBe);
