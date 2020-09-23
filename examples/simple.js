const { instruct } = require('../src/index.js');

console.log('running `instruct(', ['c', 'w', 'j', 'c', 'j', 'j', '2', 'q'], ')`');
console.log('\nresult:');
console.log('%j', instruct(['c', 'w', 'j', 'c', 'j', 'j', '2', 'q']));

