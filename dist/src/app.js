"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const inquirerAutosubmit = require("inquirer-autosubmit-prompt");
const entry = require("../src/entry");
const prompts = require("../src/prompts");
const yamlService_1 = require("../src/yamlService");
inquirer.registerPrompt('autosubmit', inquirerAutosubmit);
class App {
    constructor(storageService) {
        this.storageService = storageService;
    }
    capMain() {
        this.storageService.CreateFile();
        const yaml = this.storageService.ReadYaml();
        if (yaml != null) {
            this.storageService.SortEntriesInYaml();
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
        const yaml = this.storageService.ReadYaml();
        console.log('\n+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log(`Question: ${yaml[entryIndex].question}`);
        console.log(`Answer: ${yaml[entryIndex].answer}`);
        console.log('+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log('(q) edit question         (a) edit answer');
        console.log('(d) delete entry              (b) go back\n');
        inquirer.prompt(prompts.entryOptions)
            .then((answer) => {
            if (answer.entryoptions === 'a') {
                this.capAddAnswer(entryIndex);
            }
            else if (answer.entryoptions === 'b') {
                this.capMain();
            }
            else if (answer.entryoptions === 'd') {
                this.capDeleteQuestion(entryIndex);
            }
            else if (answer.entryoptions === 'q') {
                this.capEditQuestion(entryIndex);
            }
            else {
                console.log('That is not a valid choice. Please try again.');
                this.capShowEntry(entryIndex);
            }
        });
    }
    capEditQuestion(entryIndex) {
        const thisentry = this.storageService.ReadYaml()[entryIndex];
        prompts.editQuestionPrompt.default = thisentry.question;
        inquirer.prompt(prompts.editQuestionPrompt).then((answer) => {
            this.storageService.EditEntryInYaml(entryIndex, answer.newquestion);
            this.storageService.SortEntriesInYaml();
            this.capShowEntry(entryIndex);
        });
    }
    capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
            .then((answer) => {
            let thisentry = entry.CreateEntry('');
            thisentry = entry.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry);
            this.capAddAnswer(entryIndex);
        });
    }
    capAddAnswer(entryIndex) {
        const thisentry = this.storageService.ReadYaml()[entryIndex];
        console.log(thisentry.question);
        inquirer.prompt(prompts.editAnswerPrompt).then((answer) => {
            if (answer.newanswer === prompts.editAnswerPrompt.default) {
                answer.newanswer = ' ';
            }
            this.storageService.EditEntryInYaml(entryIndex, undefined, answer.newanswer);
            this.storageService.SortEntriesInYaml();
            this.capMain();
        });
    }
    capDeleteQuestion(entryIndex) {
        inquirer.prompt(prompts.deleteConfirm).then((answer) => {
            if (answer.deleteentry === true) {
                this.storageService.RemoveEntryFromYaml(entryIndex);
                this.capMain();
            }
            else {
                this.capShowEntry(entryIndex);
            }
        });
    }
    capFilterEntries(tag) {
        const yaml = this.storageService.ReadYaml();
        if (yaml != null) {
            this.storageService.SortEntriesInYaml();
        }
        prompts.mainMenu.choices = ['+ Add question'];
        for (const i in yaml) {
            if (yaml[i].tags.includes(tag)) {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            }
        }
    }
}
exports.default = App;
const yamlService = new yamlService_1.default('data/questions.yaml');
const app = new App(yamlService);
app.capMain();
//# sourceMappingURL=app.js.map