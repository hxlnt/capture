export const mainMenu = {
    type: 'list',
    name: 'options',
    message: 'Welcome to CAPTURE\n\n',
    choices: ['+ Add question'],
};

export const entryOptions = {
    type: 'autosubmit',
    name: 'entryoptions',
    message: 'Make a selection:',
    autoSubmit: (input: { length: number; }) => input.length == 1
}

export const editQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    default: '???',
    message: 'Your question:',
};

export const editAnswerPrompt = {
    type: 'input',
    name: 'newanswer',
    default: 'Or, press Enter to save question without answering.',
    message: 'Your answer:',
};

export const deleteConfirm = {
    type: 'confirm', 
    name: 'deleteentry', 
    message: 'Are you sure you want to delete this entry?',
    default: true,
}