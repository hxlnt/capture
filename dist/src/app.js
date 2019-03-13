"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamlService_1 = require("../src/yamlService");
const prompts = require("../src/prompts");
const inquirer = require("inquirer");
class App {
    constructor(storageService, questionPath) {
        this.storageService = storageService;
        this.questionPath = questionPath;
    }
    capMain() {
        this.storageService.CreateFile(this.questionPath);
        this.storageService.SortEntriesInYaml;
        let yaml = this.storageService.ReadYaml(this.questionPath);
        prompts.mainMenu.choices = ['+ Add question'];
        for (let i in yaml) {
            if (yaml[i].answer == 'This question has not been answered yet.') {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            }
            else {
                prompts.mainMenu.choices.push(`${yaml[i].question} (Answered on ${new Date(yaml[i].dateClosed).toLocaleDateString()})`);
            }
        }
        inquirer.prompt(prompts.mainMenu)
            .then((answer) => {
            if (answer.options === prompts.mainMenu.choices[0]) {
                this.capAddQuestion();
            }
            else {
                this.capShowEntry(prompts.mainMenu.choices.indexOf(answer.options));
            }
        });
    }
    capShowEntry(entryIndex) {
        let yaml = this.storageService.ReadYaml('data/questions.yaml');
        console.log(yaml[entryIndex].question);
        console.log(yaml[entryIndex].answer);
    }
    capEditQuestion(entryIndex) {
    }
    capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
            .then((answer) => {
            const thisentry = this.storageService.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry, this.questionPath);
            this.capAddAnswer(entryIndex);
        });
    }
    capAddAnswer(entryIndex) {
        inquirer.prompt(prompts.editAnswerPrompt).then((answer) => {
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, undefined, answer.newanswer);
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capMain();
        });
    }
    deleteQuestion(entryIndex) {
    }
}
exports.default = App;
const yamlService = new yamlService_1.default();
const app = new App(yamlService, 'data/questions.yaml');
app.capMain();
//# sourceMappingURL=app.js.map