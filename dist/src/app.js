"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamlService_1 = require("../src/yamlService");
const inquirer = require("inquirer");
class App {
    constructor() {
        this.yamlService = new yamlService_1.default();
    }
    Main() {
        const mainMenu = {
            type: 'list',
            name: 'options',
            message: 'Make a selection from the options below.',
            choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],
        };
        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(mainMenu).then((answer) => {
            if (answer.options === mainMenu.choices[0]) {
                this.addQuestion();
            }
            else {
                throw new Error((`Invalid selection: ${answer.options}`));
            }
            // else if (answer.options === mainMenu.choices[2]) { answerQuestion(); } else if (answer.options === mainMenu.choices[3]) { deleteQuestion(); } else if (answer.options === mainMenu.choices[4]) { listQuestions(); }
        });
    }
    addQuestion() {
        const addQuestionPrompt = {
            type: 'input',
            name: 'newquestion',
            message: 'What\'s your question?:',
        };
        inquirer.prompt(addQuestionPrompt).then((answer) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            console.log('Question added.');
        });
    }
}
exports.default = App;
const app = new App();
app.Main();
//# sourceMappingURL=app.js.map