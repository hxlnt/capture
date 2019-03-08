
export const mainMenu = {

    type: 'list',
    name: 'options',
    message: 'Make a selection from the options below.',
    choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],

};

export const entryOptions = {

    type: 'list',
    name: 'entryoptions',
    message: '',
    choices: ['Add answer', 'Edit question', 'Add another question', 'Go back'],

}

export const addQuestionPrompt = {

    type: 'input',
    name: 'newquestion',
    message: 'What\'s your question?:',

};

export const listQuestionsPrompt = {
    type: 'list',
    name: 'questionlist',
    message: 'Make a selection from the options below.',
    choices: ['List answered', 'List unanswered', 'List all', 'Go back'],
}

export const filteredQuestions = {
    type: 'list',
    name: 'filteredquestions',
    message: "",
    choices: [],
}

