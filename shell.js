var readline = require('readline');
var prompt = 'marcell> ';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(prompt, function(input) {
  // appendToFile(input);

  console.log('appending:', input);
  rl.close();
});
