export const mainMenu = {
    choices: ['+ Add question'],
    message: 'Welcome to CAPTURE\n\n',
    name: 'options',
    type: 'list',
};

export const entryOptions = {
    autoSubmit: (input: { length: number; }) => input.length === 1,
    message: 'Make a selection:',
    name: 'entryoptions',
    type: 'autosubmit',
};

export const editQuestionPrompt = {
    default: '???',
    message: 'Your question:',
    name: 'newquestion',
    type: 'input',
};

export const editAnswerPrompt = {
    default: 'Or, press Enter to save question without answering.',
    message: 'Your answer:',
    name: 'newanswer',
    type: 'input',
};

export const deleteConfirm = {
    default: true,
    message: 'Are you sure you want to delete this entry?',
    name: 'deleteentry',
    type: 'confirm',
};
