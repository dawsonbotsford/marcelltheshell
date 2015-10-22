#! /usr/bin/env node

var chalk = require('chalk');
var fs = require('fs-extra');
var temp = require('temp');
var path = require('path');
var picker = require('./picker.js');

var rcFileName = '.marcelrc.json';

var dir = 'temp';

arg = process.argv.slice(2);

if (arg.length > 1) {
  console.log(chalk.red('sorry, only can only handle one arg'));
  process.exit(1);
}

var lang = arg;

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
var rcPath = path.join(getUserHome(), rcFileName);

fs.stat(rcPath, function(err, stat) {
  if(err == null) {
    //success
    fs = require('fs');
    fs.readFile(rcPath, 'utf8', function (readErr,data) {
      if (err) {
        return console.log(readErr);
      }
      data = JSON.parse(data);
      console.log(data);
      console.log(Object.keys(data));

      picker.promptLang(data);
    });



  } else if(err.code == 'ENOENT') {
    console.log(chalk.red('woops! ') + rcFileName + ' not found');
    console.log('Copying the default config into ' + rcPath + '...');
    fs.copySync(rcFileName, rcPath);
    console.log(chalk.green('Config copied successfully'));
  } else {
    console.log(chalk.red('fs error checking for ' + rcFileName));
  }
});

//
// function writeToTmp(myText) {
//
//   var dirPath = temp.mkdirSync(dir);
//
//   console.log('dirPath: ' + dirPath);
//
//   fs.writeFileSync(htmlPath, myText);
//
//   //cleanup temp
//   temp.cleanupSync();
// }
//
// // exec(manCommand, function (error, stdout, stderr) {
// //   if (stdout !== null && stdout !== '') {
// //     console.log(chalk.green('man command executed successfully'));
// //     writeToTmp(stdout);
// //   }
// //   if (stderr !== null && stderr !== '') {
// //     console.log(chalk.yellow(stderr));
// //   }
// //   if (error !== null && error !== '') {
// //     console.log(chalk.red(error));
// //   }
// // });
