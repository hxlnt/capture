"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = {
    type: 'list',
    name: 'options',
    message: 'Welcome to CAPTURE\n\n',
    choices: ['+ Add question'],
};
exports.entryOptions = {
    type: 'list',
    name: 'entryoptions',
    message: '',
    choices: ['Edit', 'Delete', 'Go back'],
};
exports.addQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    message: 'What\'s your question?:',
};
exports.addAnswerPrompt = {
    type: 'input',
    name: 'editanswer',
    message: 'What\'s your answer?:',
};
exports.deleteConfirm = {
    type: 'confirm',
    name: 'deleteentry',
    message: 'Are you sure you want to delete?',
    default: true,
};
//# sourceMappingURL=prompts.js.map