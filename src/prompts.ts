export const mainMenu = {
    type: 'list',
    name: 'options',
    message: 'Welcome to CAPTURE\n\n',
    choices: ['+ Add question'],
};

export const entryOptions = {
    type: 'list',
    name: 'entryoptions',
    message: '',
    choices: ['Edit', 'Delete', 'Go back'],
}

export const editQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    message: 'What\'s your question?:',
};

export const editAnswerPrompt = {
    type: 'input',
    name: 'newanswer',
    message: 'What\'s your answer?:',
};

export const deleteConfirm = {
    type: 'confirm', 
    name: 'deleteentry', 
    message: 'Are you sure you want to delete this entry?',
    default: true,
}