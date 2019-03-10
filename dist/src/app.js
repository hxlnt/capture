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
        for (let i in yaml) {
            if (yaml[i].answer == 'This question has not been answered yet.') {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            }
            else {
                prompts.mainMenu.choices.push(`${yaml[i].question} (Answered on ${yaml[i].dateClosed})`);
            }
        }
        inquirer.prompt(prompts.mainMenu)
            .then((answer) => {
            if (answer.options === prompts.mainMenu.choices[0]) {
                this.capAddQuestion();
            }
            else {
                throw new Error((`Invalid selection: ${answer.options}`));
            }
            // else if (answer.options === mainMenu.choices[2]) { answerQuestion(); } else if (answer.options === mainMenu.choices[3]) { deleteQuestion(); } else if (answer.options === mainMenu.choices[4]) { listQuestions(); }d
        });
    }
    capShowEntry(entryIndex) {
    }
    capEditQuestion(entryIndex) {
    }
    capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
            .then((answer) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
        });
        inquirer.prompt(prompts.editAnswerPrompt).then((answer) => {
            this.yamlService.EditEntryInYaml(entryIndex, 'data/questions.yaml', undefined, answer.newanswer);
            this.yamlService.SortEntriesInYaml('data/questions.yaml');
            this.capMain();
        });
    }
    addAnswer(entryIndex) {
    }
    deleteQuestion(entryIndex) {
    }
}
exports.default = App;
const app = new App();
app.capMain();
//# sourceMappingURL=app.js.map