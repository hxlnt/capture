import YamlService, { IQuestion } from '../src/yamlService';
import * as prompts from '../src/prompts';
import inquirer = require('inquirer');

export default class App {

    storageService: YamlService;
    questionPath: string;
    constructor(storageService: YamlService, questionPath: string){
        this.storageService = storageService;
        this.questionPath = questionPath;
    }

    public capMain() {
        this.storageService.CreateFile(this.questionPath);
        this.storageService.SortEntriesInYaml
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
        .then((answer: inquirer.Answers) => {
            if (answer.options === prompts.mainMenu.choices[0]) { this.capAddQuestion(); } else { this.capShowEntry(prompts.mainMenu.choices.indexOf(answer.options)); }
        });

    }

    public capShowEntry(entryIndex: number) {
        let yaml = this.storageService.ReadYaml('data/questions.yaml');
        console.log(yaml[entryIndex].question);
        console.log(yaml[entryIndex].answer);
    }

    public capEditQuestion(entryIndex: number){

    }

    public capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
        .then((answer: inquirer.Answers) => {
            const thisentry = this.storageService.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry, this.questionPath);
            this.capAddAnswer(entryIndex);
        });
    }

    public capAddAnswer(entryIndex: number) {
        inquirer.prompt(prompts.editAnswerPrompt).then((answer: inquirer.Answers) => {
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, undefined, answer.newanswer)
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capMain();
        });
    }

    public deleteQuestion(entryIndex: number) {

    }

}
const yamlService = new YamlService();
const app = new App(yamlService, 'data/questions.yaml');
app.capMain();
