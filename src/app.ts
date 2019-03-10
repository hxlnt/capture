import YamlService, { IQuestion } from '../src/yamlService';
import * as prompts from '../src/prompts';
import inquirer = require('inquirer');

export default class App {

    public yamlService = new YamlService();

    public capMain() {
        this.yamlService.SortEntriesInYaml
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
        .then((answer: inquirer.Answers) => {
            if (answer.options === prompts.mainMenu.choices[0]) { this.capAddQuestion(); } else { throw new Error((`Invalid selection: ${answer.options}`)); }

            // else if (answer.options === mainMenu.choices[2]) { answerQuestion(); } else if (answer.options === mainMenu.choices[3]) { deleteQuestion(); } else if (answer.options === mainMenu.choices[4]) { listQuestions(); }d

        });

    }

    public capShowEntry(entryIndex: number) {
    
    }

    public capEditQuestion(entryIndex: number){

    }

    public capAddQuestion
    () {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
        .then((answer: inquirer.Answers) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
        })
        inquirer.prompt(prompts.editAnswerPrompt).then((answer: inquirer.Answers) => {
            this.yamlService.EditEntryInYaml(entryIndex, 'data/questions.yaml', undefined, answer.newanswer)
            this.yamlService.SortEntriesInYaml('data/questions.yaml');
            this.capMain();
        });
    }

    public addAnswer(entryIndex: number) {
        
    }

    public deleteQuestion(entryIndex: number) {

    }

}

const app = new App();
app.capMain();
