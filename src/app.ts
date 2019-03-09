import YamlService, { IQuestion } from '../src/yamlService';
import * as prompts from '../src/prompts';
import inquirer = require('inquirer');

export default class App {

    public yamlService = new YamlService();

    public Main() {
        console.log('\nWelcome to CAPTURE.\n');
        inquirer.prompt(prompts.mainMenu)
        .then((answer: inquirer.Answers) => {
        });

    }

    public showEntry(entryIndex: number) {
    
    }

    public editQuestion(entryIndex: number){

    }

    public addQuestion() {
        inquirer.prompt(prompts.addQuestionPrompt)
        .then((answer: inquirer.Answers) => {
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

}

const app = new App();
app.Main();
