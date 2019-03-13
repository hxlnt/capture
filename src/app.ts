import YamlService, { IQuestion } from '../src/yamlService';
import * as prompts from '../src/prompts';
import inquirer = require('inquirer');

export default class App {

    public yamlService = new YamlService();

    public capMain() {
        this.yamlService.CreateFile('data/questions.yaml');
        this.yamlService.SortEntriesInYaml
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
        .then((answer: inquirer.Answers) => {
            if (answer.options === prompts.mainMenu.choices[0]) { this.capAddQuestion(); } else { this.capShowEntry(answer.indexOf()); }
        });

    }

    public capShowEntry(entryIndex: number) {
        let yaml = this.yamlService.ReadYaml('data/questions.yaml');
        console.log(yaml[entryIndex].question);
        console.log(yaml[entryIndex].answer);
    }

    public capEditQuestion(entryIndex: number){

    }

    public capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
        .then((answer: inquirer.Answers) => {
            const thisentry = this.yamlService.CreateEntry(answer.newquestion);
            entryIndex = this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            this.capAddAnswer(entryIndex);
        });
    }

    public capAddAnswer(entryIndex: number) {
        inquirer.prompt(prompts.editAnswerPrompt).then((answer: inquirer.Answers) => {
            this.yamlService.EditEntryInYaml(entryIndex, 'data/questions.yaml', undefined, answer.newanswer)
            this.yamlService.SortEntriesInYaml('data/questions.yaml');
            this.capMain();
        });
    }

    public deleteQuestion(entryIndex: number) {

    }

}

const app = new App();
app.capMain();
