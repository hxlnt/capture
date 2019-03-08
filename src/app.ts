import YamlService, { IQuestion } from '../src/yamlService';
import * as prompts from '../src/prompts';
import inquirer = require('inquirer');

export default class App {

    public yamlService = new YamlService();

    public Main() {
        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(prompts.mainMenu).then((answer: inquirer.Answers) => {
            if (answer.options === prompts.mainMenu.choices[0]) { this.addQuestion(); } else if (answer.options === prompts.mainMenu.choices[3]) { this.listQuestions(); } else { throw new Error((`Invalid selection: ${answer.options}`)); }
            //else if (answer.options === mainMenu.choices[1]) { this.addAnswer(entryIndex); } else if (answer.options === mainMenu.choices[2]) { this.deleteQuestion(); } 
        });

    }

    public showEntry(entryIndex: number) {
        const result = this.yamlService.ReadYaml('data/questions.yaml')[entryIndex];
        prompts.entryOptions.message = `${result.question}\n${result.answer}\nAsked on ${result.dateOpened}`;
        inquirer.prompt(prompts.entryOptions).then((answer: inquirer.Answers) => {
            if (answer.entryoptions === prompts.entryOptions.choices[0]) { this.addAnswer(entryIndex); } else if (answer.entryoptions === prompts.entryOptions.choices[1]) { this.editQuestion(entryIndex); } else if (answer.entryoptions === prompts.entryOptions.choices[2]) { this.addQuestion(); } else if (answer.entryoptions === prompts.entryOptions.choices[3]) { this.Main(); } else { throw new Error((`Invalid selection: ${answer.entryoptions}`)); }
       });
    }

    public editQuestion(entryIndex: number){

    }

    public addQuestion() {
        inquirer.prompt(prompts.addQuestionPrompt).then((answer: inquirer.Answers) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            let entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            console.log('Question added.');
            this.showEntry(entryIndex);
        });
    }

    public addAnswer(entryIndex: number) {
        
    }

    public deleteQuestion(entryIndex: number) {

    }

    public listQuestions(): void {
        inquirer.prompt(prompts.listQuestionsPrompt).then((answer: inquirer.Answers) => {
            if (answer.entryOptions === prompts.entryOptions.choices[0]) { this.listQuestionsFiltered("answered"); } else if (answer.entryOptions === prompts.entryOptions.choices[1]) { this.listQuestionsFiltered("unanswered"); } else if (answer.entryOptions === prompts.entryOptions.choices[2]) { this.listQuestionsFiltered("all"); } else if (answer.entryOptions === prompts.entryOptions.choices[3]) { this.Main(); } else { throw new Error((`Invalid selection: ${answer.entryPptions}`)); }
        });
    }

    public listQuestionsFiltered(filter: string): void {
        const result = this.yamlService.ReadYaml('data/questions.yaml');
        let filteredResult = [Object];
        if (filter == "unanswered") { 
            filteredResult = result.filter(() => result.answer != 'This question has not been answered yet.');
        }
        else if (filter == "answered") { 
            filteredResult = result.filter(() => result.answer != 'This question has not been answered yet.');
        }
        else if (filter == "all") { return result }
        else { throw new Error('Invalid boop.') }

        inquirer.prompt(prompts.filteredQuestions).then((answer: inquirer.Answers) => {
            for (var choice in filteredResult) {
                answer.choices.add(choice);
            }
        });
    }
}

const app = new App();
app.Main();
