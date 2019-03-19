import inquirer = require('inquirer');
import inquirerAutosubmit = require('inquirer-autosubmit-prompt');
import * as entry from '../src/entry';
import * as prompts from '../src/prompts';
import YamlService from '../src/yamlService';

inquirer.registerPrompt('autosubmit', inquirerAutosubmit);

export default class App {

    private storageService: YamlService;
    constructor(storageService: YamlService) {
        this.storageService = storageService;
    }

    public capMain() {
        this.storageService.CreateFile();
        const yaml = this.storageService.ReadYaml();
        if (yaml != null) {
            this.storageService.SortEntriesInYaml();
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
        const yaml = this.storageService.ReadYaml();
        console.log('\n+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log(`Question: ${yaml[entryIndex].question}`);
        console.log(`Answer: ${yaml[entryIndex].answer}`);
        console.log('+-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-+');
        console.log('(q) edit question         (a) edit answer');
        console.log('(d) delete entry              (b) go back\n');
        inquirer.prompt(prompts.entryOptions)
        .then((answer: inquirer.Answers) => {
            if (answer.entryoptions === 'a') {
                this.capAddAnswer(entryIndex);
            } else if (answer.entryoptions === 'b') {
                this.capMain();
            } else if (answer.entryoptions === 'd') {
                this.capDeleteQuestion(entryIndex);
            } else if (answer.entryoptions === 'q') {
                this.capEditQuestion(entryIndex);
            } else {
                console.log('That is not a valid choice. Please try again.');
                this.capShowEntry(entryIndex);
            }
        });
    }


    public capEditQuestion(entryIndex: number) {
        const thisentry = this.storageService.ReadYaml()[entryIndex];
        prompts.editQuestionPrompt.default = thisentry.question;
        inquirer.prompt(prompts.editQuestionPrompt).then((answer: inquirer.Answers) => {
            this.storageService.EditEntryInYaml(entryIndex, answer.newquestion);
            this.storageService.SortEntriesInYaml();
            this.capShowEntry(entryIndex);
        });
    }

    public capAddQuestion() {
        let entryIndex = 0;
        inquirer.prompt(prompts.editQuestionPrompt)
        .then((answer: inquirer.Answers) => {
            let thisentry = entry.CreateEntry('');
            thisentry = entry.CreateEntry(answer.newquestion);
            entryIndex = this.storageService.AddEntryToYaml(thisentry);
            this.capAddAnswer(entryIndex);
        });
    }

    public capAddAnswer(entryIndex: number) {
            const thisentry = this.storageService.ReadYaml()[entryIndex];
            console.log(thisentry.question);
            inquirer.prompt(prompts.editAnswerPrompt).then((answer: inquirer.Answers) => {
            if (answer.newanswer === prompts.editAnswerPrompt.default) {
                answer.newanswer = ' ';
            }
            this.storageService.EditEntryInYaml(entryIndex, undefined, answer.newanswer);
            this.storageService.SortEntriesInYaml();
            this.capMain();
        });
    }

    public capDeleteQuestion(entryIndex: number) {
        inquirer.prompt(prompts.deleteConfirm).then((answer: inquirer.Answers) => {
            if (answer.deleteentry === true) {
                this.storageService.RemoveEntryFromYaml(entryIndex);
                this.capMain();
            } else { this.capShowEntry(entryIndex); }
        });
    }

    public capFilterEntries(tag: string) {
        const yaml = this.storageService.ReadYaml();
        if (yaml != null) {
            this.storageService.SortEntriesInYaml();
        }
        prompts.mainMenu.choices = ['+ Add question'];
        for (const i in yaml) {
            if (yaml[i].tags.includes(tag)) {
                prompts.mainMenu.choices.push(`${yaml[i].question}`);
            }
        }
    }

}
const yamlService = new YamlService('questions.yaml');
const app = new App(yamlService);
app.capMain();
