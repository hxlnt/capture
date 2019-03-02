"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const assert = require("assert");
describe('YamlService', () => {
    let testYamlService;
    beforeEach(() => { testYamlService = new app_1.default(); });
    describe('ReadYaml', () => {
        it('should read test.yaml', () => {
            const mockRead = testYamlService.ReadYaml('../test/data/test.yaml');
            console.log(mockRead);
            const expectedResult = {
                question: 'What is 1+1?',
                answer: 'This question has not been answered yet.',
                dateOpened: new Date('Fri Mar 01 2019 23:38:46 GMT-0600 (Central Standard Time)'),
                dateClosed: new Date('Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)'),
            };
            assert.equal(mockRead.question, expectedResult.question);
            assert.equal(mockRead.answer, expectedResult.answer);
            assert.deepEqual(mockRead.dateClosed, expectedResult.dateClosed);
        });
    });
    describe('CreateEntry', () => {
        it('should create a entry object from a string', () => {
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            const expectedResult = {
                question: 'What is 1+1?',
                answer: 'This question has not been answered yet.',
                dateOpened: new Date(),
                dateClosed: new Date(0),
            };
            assert.equal(mockEntry.question, expectedResult.question);
            assert.equal(mockEntry.answer, expectedResult.answer);
            assert.deepEqual(mockEntry.dateClosed, expectedResult.dateClosed);
        });
    });
    // describe('EditEntry', () => {
    //     it('should edit an entry object', () => {
    //         const mockEntry = testYamlService.CreateEntry('What is 1+1?');
    //         const mockResult = testYamlService.EditEntry(entry = mockEntry, question = 'What is 1+2?');
    //         const expectedResult = {
    //             question: 'What is 1+2?',
    //             answer: 'This question has not been answered yet.',
    //             dateOpened: new Date(),
    //             dateClosed: new Date(0),
    //         };
    //         assert.equal(mockResult.question, expectedResult.question);
    //         assert.equal(mockResult.answer, expectedResult.answer);
    //         assert.deepEqual(mockResult.dateClosed, expectedResult.dateClosed);
    //     });
    // });
});
//# sourceMappingURL=app.test.js.map