import yamlService = require('./yamlService');
import inquirer = require('inquirer');

export default class App {

    public Main() {

        const mainMenu = {

            type: 'list',
            name: 'options',
            message: 'Make a selection from the options below.',
            choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],

        };

        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(mainMenu).then((answers: inquirer.Answers) => {
            console.log(`You selected ${answers.options}.`);
        });

    }
}

const app = new App();
app.Main();
