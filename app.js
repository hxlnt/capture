'use strict'
const fs = require('fs');
const inquirer = require("inquirer")

const menu = {
  type: 'list',
  name: 'mainmenu',
  message: 'W e l c o m e   t o   C A P T U R E',
  choices: ['Add question', 'Answer question', 'List questions', 'Add idea', 'List ideas']
}

function readFile(path){
  fs.readFile(path, function(err, data) {
    if (err) {
      if (err.errno == 2) {
        console.log(`Creating ${path}.`);
      }
      else { console.log(err); }
    return err;
    }
    else {
      console.log(data.toString());
      return data;
    }
  }); 
}

readFile("questions.yaml");

inquirer.prompt(menu).then(answers => {
  console.log(JSON.stringify(answers))
});

module.exports = readFile;
