var inquirer = require('inquirer');

module.exports = {
  promptLang: function(obj) {
    questions = [{
      name: 'language',
      message: 'Want to you want to make a shell for?',
      type: 'list',
      choices: Object.keys(obj)
    }];

    function executeLang(result) {
      console.log('running ' + result.language);
    }

    inquirer.prompt(questions, executeLang);
  }
};
