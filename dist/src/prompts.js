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
exports.editQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    message: 'What\'s your question?:',
};
exports.editAnswerPrompt = {
    type: 'input',
    name: 'newanswer',
    message: 'What\'s your answer?:',
};
exports.deleteConfirm = {
    type: 'confirm',
    name: 'deleteentry',
    message: 'Are you sure you want to delete this entry?',
    default: true,
};
//# sourceMappingURL=prompts.js.map