'use strict'
const inquirer = require("inquirer")

const menu = {
  type: 'list',
  name: 'mainmenu',
  message: 'W e l c o m e   t o   C A P T U R E',
  choices: ['Add question', 'Answer question', 'List questions', 'Add idea', 'List ideas']
}

inquirer.prompt(menu).then(answers => {
  console.log(JSON.stringify(answers))
});

