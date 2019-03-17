"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = {
    choices: ['+ Add question'],
    message: 'Welcome to CAPTURE\n\n',
    name: 'options',
    type: 'list',
};
exports.filteredMainMenu = {
    choices: ['+ Add question'],
    message: 'Welcome to CAPTURE\n\n',
    name: 'options',
    type: 'list',
};
exports.entryOptions = {
    autoSubmit: (input) => input.length === 1,
    message: 'Make a selection:',
    name: 'entryoptions',
    type: 'autosubmit',
};
exports.editQuestionPrompt = {
    default: '???',
    message: 'Your question:',
    name: 'newquestion',
    type: 'input',
};
exports.editAnswerPrompt = {
    default: 'Or, press Enter to save question without answering.',
    message: 'Your answer:',
    name: 'newanswer',
    type: 'input',
};
exports.deleteConfirm = {
    default: true,
    message: 'Are you sure you want to delete this entry?',
    name: 'deleteentry',
    type: 'confirm',
};
//# sourceMappingURL=prompts.js.map