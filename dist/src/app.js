"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
// import inquirerAutosubmit = require('inquirer-autosubmit-prompt');
const prompts = require("../src/prompts");
const yamlService_1 = require("../src/yamlService");
inquirer.registerPrompt('autosubmit', require('inquirer-autosubmit-prompt'));
class App {
    constructor(storageService, questionPath) {
        this.storageService = storageService;
        this.questionPath = questionPath;
    }
    capMain() {
        this.storageService.CreateFile(this.questionPath);
        const yaml = this.storageService.ReadYaml(this.questionPath);
        if (yaml != null) {
            this.storageService.SortEntriesInYaml(this.questionPath);
        }
        prompts.mainMenu.choices = ['+ Add question'];
        for (const i in yaml) {
            if (yaml[i].answer === ' ') {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            }
            else {
                const dateClosed = new Date(yaml[i].dateClosed).toLocaleDateString();
                prompts.mainMenu.choices.push(`${yaml[i].question} (Answered on ${dateClosed})`);
            }
        }
        inquirer.prompt(prompts.mainMenu)
            .then((answer) => {
            if (answer.options === prompts.mainMenu.choices[0]) {
                this.capAddQuestion();
            }
            else {
                this.capShowEntry(prompts.mainMenu.choices.indexOf(answer.options) - 1);
            }
        });
    }
    capShowEntry(entryIndex) {
        const yaml = this.storageService.ReadYaml('data/questions.yaml');
        console.log(`Question: ${yaml[entryIndex].question}`);
        console.log(`Answer: ${yaml[entryIndex].answer}`);
        console.log('-----------------------------------------------------');
        console.log('\'a\': edit answer              \'q\': edit question');
        console.log('\'d\': delete question          \'b\': go back');
        inquirer.prompt(prompts.entryOptions)
            .then((answer) => {
            if (answer.entryoptions === 'a') {
                this.capAddAnswer(entryIndex);
            }
            else if (answer.entryoptions === 'b') {
                this.capMain();
            }
            else if (answer.entryoptions === 'd') {
                this.deleteQuestion(entryIndex);
            }
            else if (answer.entryoptions === 'e') {
                this.capEditQuestion(entryIndex);
            }
            else {
                console.log('That is not a valid choice. Please try again.');
                this.capShowEntry(entryIndex);
            }
        });
    }
    capEditQuestion(entryIndex) {
        const thisentry = this.storageService.ReadYaml(this.questionPath)[entryIndex];
        prompts.editQuestionPrompt.default = thisentry.question;
        inquirer.prompt(prompts.editQuestionPrompt).then((answer) => {
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, answer.newquestion, undefined);
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capShowEntry(entryIndex);
        });
    }
    capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
            .then((answer) => {
            let thisentry = this.storageService.CreateEntry('');
            thisentry = this.storageService.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry, this.questionPath);
            this.capAddAnswer(entryIndex);
        });
    }
    capAddAnswer(entryIndex) {
        const thisentry = this.storageService.ReadYaml(this.questionPath)[entryIndex];
        console.log(thisentry.question);
        inquirer.prompt(prompts.editAnswerPrompt).then((answer) => {
            if (answer.newanswer === prompts.editAnswerPrompt.default) {
                answer.newanswer = ' ';
            }
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, undefined, answer.newanswer);
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capShowEntry(entryIndex);
        });
    }
    deleteQuestion(entryIndex) {
        inquirer.prompt(prompts.deleteConfirm).then((answer) => {
            if (answer.deleteentry === true) {
                this.storageService.RemoveEntryFromYaml(entryIndex, this.questionPath);
                this.capMain();
            }
            else {
                this.capShowEntry(entryIndex);
            }
        });
    }
}
exports.default = App;
const yamlService = new yamlService_1.default();
const app = new App(yamlService, 'data/questions.yaml');
app.capMain();
//# sourceMappingURL=app.js.map