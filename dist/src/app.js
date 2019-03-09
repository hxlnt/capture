"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamlService_1 = require("../src/yamlService");
const prompts = require("../src/prompts");
const inquirer = require("inquirer");
class App {
    constructor() {
        this.yamlService = new yamlService_1.default();
    }
    Main() {
        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(prompts.mainMenu)
            .then((answer) => {
        });
    }
    showEntry(entryIndex) {
    }
    editQuestion(entryIndex) {
    }
    addQuestion() {
        inquirer.prompt(prompts.addQuestionPrompt)
            .then((answer) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            let entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            console.log('Question added.');
            this.showEntry(entryIndex);
        });
    }
    addAnswer(entryIndex) {
    }
    deleteQuestion(entryIndex) {
    }
}
exports.default = App;
const app = new App();
app.Main();
//# sourceMappingURL=app.js.map