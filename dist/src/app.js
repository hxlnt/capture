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
        inquirer.prompt(prompts.mainMenu).then((answer) => {
            if (answer.options === prompts.mainMenu.choices[0]) {
                this.addQuestion();
            }
            else if (answer.options === prompts.mainMenu.choices[3]) {
                this.listQuestions();
            }
            else {
                throw new Error((`Invalid selection: ${answer.options}`));
            }
            //else if (answer.options === mainMenu.choices[1]) { this.addAnswer(entryIndex); } else if (answer.options === mainMenu.choices[2]) { this.deleteQuestion(); } 
        });
    }
    showEntry(entryIndex) {
        const result = this.yamlService.ReadYaml('data/questions.yaml')[entryIndex];
        prompts.entryOptions.message = `${result.question}\n${result.answer}\nAsked on ${result.dateOpened}`;
        inquirer.prompt(prompts.entryOptions).then((answer) => {
            if (answer.entryoptions === prompts.entryOptions.choices[0]) {
                this.addAnswer(entryIndex);
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[1]) {
                this.editQuestion(entryIndex);
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[2]) {
                this.addQuestion();
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[3]) {
                this.Main();
            }
            else {
                throw new Error((`Invalid selection: ${answer.entryoptions}`));
            }
        });
    }
    editQuestion(entryIndex) {
    }
    addQuestion() {
        inquirer.prompt(prompts.addQuestionPrompt).then((answer) => {
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
    listQuestions() {
        inquirer.prompt(prompts.listQuestionsPrompt).then((answer) => {
            if (answer.entryoptions === prompts.entryOptions.choices[0]) {
                this.listQuestionsFiltered("answered");
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[1]) {
                this.listQuestionsFiltered("unanswered");
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[2]) {
                this.listQuestionsFiltered("all");
            }
            else if (answer.entryoptions === prompts.entryOptions.choices[3]) {
                this.Main();
            }
            else {
                throw new Error((`Invalid selection: ${answer.entryoptions}`));
            }
        });
    }
    listQuestionsFiltered(filter) {
        const result = this.yamlService.ReadYaml('data/questions.yaml');
        let filteredResult = [Object];
        if (filter == "unanswered") {
            filteredResult = result.filter(() => result.answer != 'This question has not been answered yet.');
        }
        else if (filter == "answered") {
            filteredResult = result.filter(() => result.answer != 'This question has not been answered yet.');
        }
        else if (filter == "all") {
            return result;
        }
        else {
            throw new Error('Invalid boop.');
        }
        inquirer.prompt(prompts.filteredQuestions).then((answer) => {
            for (var choice in filteredResult) {
                answer.choices.add(choice);
            }
        });
    }
}
exports.default = App;
const app = new App();
app.Main();
//# sourceMappingURL=app.js.map