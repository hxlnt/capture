"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = {
    type: 'list',
    name: 'options',
    message: 'Make a selection from the options below.',
    choices: ['Add question', 'Answer question', 'Delete question', 'List questions'],
};
exports.entryOptions = {
    type: 'list',
    name: 'entryoptions',
    message: '',
    choices: ['Add answer', 'Edit question', 'Add another question', 'Go back'],
};
exports.addQuestionPrompt = {
    type: 'input',
    name: 'newquestion',
    message: 'What\'s your question?:',
};
exports.listQuestionsPrompt = {
    type: 'list',
    name: 'questionlist',
    message: 'Make a selection from the options below.',
    choices: ['List answered', 'List unanswered', 'List all', 'Go back'],
};
exports.filteredQuestions = {
    type: 'list',
    name: 'filteredquestions',
    message: "",
    choices: [],
};
//# sourceMappingURL=prompts.js.map