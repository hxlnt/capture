import YamlService from '../src/yamlService';
import inquirer = require('inquirer');

export default class App {

    public yamlService = new YamlService();

    public Main() {

        const mainMenu = {

            type: 'list',
            name: 'options',
            message: 'Make a selection from the options below.',
            choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],

        };

        console.log('\nWelcome to CAPTURE.\n');

        inquirer.prompt(mainMenu).then((answer: inquirer.Answers) => {
            if (answer.options === mainMenu.choices[0]) { this.addQuestion(); } else { throw new Error((`Invalid selection: ${answer.options}`)); }
            // else if (answer.options === mainMenu.choices[2]) { answerQuestion(); } else if (answer.options === mainMenu.choices[3]) { deleteQuestion(); } else if (answer.options === mainMenu.choices[4]) { listQuestions(); }
        });

    }

    public addQuestion() {

        const addQuestionPrompt = {

            type: 'input',
            name: 'newquestion',
            message: 'What\'s your question?:',

        };

        inquirer.prompt(addQuestionPrompt).then((answer: inquirer.Answers) => {

            const thisentry = this.yamlService.CreateEntry(answer.newquestion);

            this.yamlService.AddEntryToYaml(thisentry, 'data/questions.yaml');
            console.log('Question added.');

        });

    }

}

const app = new App();
app.Main();
