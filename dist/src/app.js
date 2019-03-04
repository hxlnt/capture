"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
class App {
    Main() {
        const mainMenu = {
            type: 'list',
            name: 'options',
            message: 'Make a selection from the options below.',
            choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],
        };
        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(mainMenu).then((answers) => {
            console.log(`You selected ${answers.options}.`);
        });
    }
}
exports.default = App;
const app = new App();
app.Main();
//# sourceMappingURL=app.js.map