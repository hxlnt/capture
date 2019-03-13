"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = {
    type: 'list',
    name: 'options',
    message: 'Welcome to CAPTURE\n\n',
    choices: ['+ Add question'],
};
exports.entryOptions = {
    type: 'autosubmit',
    name: 'entryoptions',
    message: 'Make a selection:',
    autoSubmit: (input) => input.length == 1
};
exports.editQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    default: '???',
    message: 'Your question:',
};
exports.editAnswerPrompt = {
    type: 'input',
    name: 'newanswer',
    default: 'Or, press Enter to save question without answering.',
    message: 'Your answer:',
};
exports.deleteConfirm = {
    type: 'confirm',
    name: 'deleteentry',
    message: 'Are you sure you want to delete this entry?',
    default: true,
};
//# sourceMappingURL=prompts.js.map