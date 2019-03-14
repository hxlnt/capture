import inquirer = require('inquirer');
import inquirerAutosubmit = require('inquirer-autosubmit-prompt');
import * as prompts from '../src/prompts';
import YamlService, { IQuestion } from '../src/yamlService';

inquirer.registerPrompt('autosubmit', inquirerAutosubmit);

export default class App {

    private storageService: YamlService;
    private questionPath: string;
    constructor(storageService: YamlService, questionPath: string) {
        this.storageService = storageService;
        this.questionPath = questionPath;
    }

    public capMain() {
        this.storageService.CreateFile(this.questionPath);
        const yaml = this.storageService.ReadYaml(this.questionPath);
        if (yaml != null) {
            this.storageService.SortEntriesInYaml(this.questionPath);
        }
        prompts.mainMenu.choices = ['+ Add question'];
        for (const i in yaml) {
            if (yaml[i].answer === ' ') {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            } else {
                const dateClosed = new Date(yaml[i].dateClosed).toLocaleDateString();
                prompts.mainMenu.choices.push(`${yaml[i].question} (Answered on ${dateClosed})`);
            }
        }
        inquirer.prompt(prompts.mainMenu)
        .then((answer: inquirer.Answers) => {
            if (answer.options === prompts.mainMenu.choices[0]) {
                this.capAddQuestion();
            } else {
                this.capShowEntry(prompts.mainMenu.choices.indexOf(answer.options) - 1);
            }
        });

    }

    public capShowEntry(entryIndex: number) {
        const yaml = this.storageService.ReadYaml('data/questions.yaml');
        console.log('\n+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log(`Question: ${yaml[entryIndex].question}`);
        console.log(`Answer: ${yaml[entryIndex].answer}`);
        console.log('+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log('(q) edit question         (a) edit answer');
        console.log('(d) delete entry          (b) go back\n');
        inquirer.prompt(prompts.entryOptions)
        .then((answer: inquirer.Answers) => {
            if (answer.entryoptions === 'a') {
                this.capAddAnswer(entryIndex);
            } else if (answer.entryoptions === 'b') {
                this.capMain();
            } else if (answer.entryoptions === 'd') {
                this.deleteQuestion(entryIndex);
            } else if (answer.entryoptions === 'e') {
                this.capEditQuestion(entryIndex);
            } else {
                console.log('That is not a valid choice. Please try again.');
                this.capShowEntry(entryIndex);
            }
        });
    }

    public capEditQuestion(entryIndex: number) {
        const thisentry = this.storageService.ReadYaml(this.questionPath)[entryIndex];
        prompts.editQuestionPrompt.default = thisentry.question;
        inquirer.prompt(prompts.editQuestionPrompt).then((answer: inquirer.Answers) => {
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, answer.newquestion, undefined);
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capShowEntry(entryIndex);
        });
    }

    public capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
        .then((answer: inquirer.Answers) => {
            let thisentry = this.storageService.CreateEntry('');
            thisentry = this.storageService.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry, this.questionPath);
            this.capAddAnswer(entryIndex);
        });
    }

    public capAddAnswer(entryIndex: number) {
            const thisentry = this.storageService.ReadYaml(this.questionPath)[entryIndex];
            console.log(thisentry.question);
            inquirer.prompt(prompts.editAnswerPrompt).then((answer: inquirer.Answers) => {
            if (answer.newanswer === prompts.editAnswerPrompt.default) {
                answer.newanswer = ' ';
            }
            this.storageService.EditEntryInYaml(entryIndex, this.questionPath, undefined, answer.newanswer);
            this.storageService.SortEntriesInYaml(this.questionPath);
            this.capShowEntry(entryIndex);
        });
    }

    public deleteQuestion(entryIndex: number) {
        inquirer.prompt(prompts.deleteConfirm).then((answer: inquirer.Answers) => {
            if (answer.deleteentry === true) {
                this.storageService.RemoveEntryFromYaml(entryIndex, this.questionPath);
                this.capMain();
            } else { this.capShowEntry(entryIndex); }
        });
    }

}
const yamlService = new YamlService();
const app = new App(yamlService, 'data/questions.yaml');
app.capMain();
