"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamlService_1 = require("../src/yamlService");
const prompts = require("../src/prompts");
const inquirer = require("inquirer");
class App {
    constructor() {
        this.yamlService = new yamlService_1.default();
    }
    capMain() {
        this.yamlService.SortEntriesInYaml;
        let yaml = this.yamlService.ReadYaml('data/questions.yaml');
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
                this.capShowEntry(answer.indexOf());
            }
        });
    }
    capShowEntry(entryIndex) {
        let yaml = this.yamlService.ReadYaml('data/questions.yaml');
        console.log(yaml[entryIndex].question);
        console.log(yaml[entryIndex].answer);
    }
    capEditQuestion(entryIndex) {
    }
    capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
            .then((answer) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            this.capAddAnswer(entryIndex);
        });
    }
    capAddAnswer(entryIndex) {
        inquirer.prompt(prompts.editAnswerPrompt).then((answer) => {
            this.yamlService.EditEntryInYaml(entryIndex, 'data/questions.yaml', undefined, answer.newanswer);
            this.yamlService.SortEntriesInYaml('data/questions.yaml');
            this.capMain();
        });
    }
    deleteQuestion(entryIndex) {
    }
}
exports.default = App;
const app = new App();
app.capMain();
//# sourceMappingURL=app.js.map