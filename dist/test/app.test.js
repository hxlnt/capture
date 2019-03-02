"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const assert = require("assert");
describe('YamlService', () => {
    let testYamlService;
    const mockResult = {
        question: 'What is 1+1?',
        answer: 'This question has not been answered yet.',
        dateOpened: '2019-03-02T06:59:04.436Z',
        dateClosed: '1970-01-01T00:00:00.000Z',
    };
    beforeEach(() => { testYamlService = new app_1.default(); });
    describe('ReadYaml', () => {
        it('should read test.yaml', () => {
            const mockRead = testYamlService.ReadYaml('./test/data/test.yaml');
            assert.equal(mockRead[0].question, mockResult.question);
            assert.equal(mockRead[0].answer, mockResult.answer);
            assert.deepEqual(mockRead[0].dateClosed, mockResult.dateClosed);
        });
    });
    describe('WriteYaml', () => {
        it('should write to test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml('./test/data/test.yaml');
            console.log(mockRead1.length);
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            testYamlService.WriteYaml(mockEntry, './test/data/test.yaml');
            console.log(mockRead1.length);
            const mockRead2 = testYamlService.ReadYaml('./test/data/test.yaml');
            console.log(mockRead1.length);
            // Object should be appended to the end of the file without altering existing content.
            assert.deepEqual(mockRead1[0], mockRead2[0]);
            assert.deepEqual(mockRead2[mockRead2.length - 1], mockEntry);
            assert.equal(mockRead1.length + 1, mockRead2.length);
        });
        it('should fail if the path is wrong', () => {
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            testYamlService.WriteYaml(mockEntry, './test/data/test2.yaml');
            assert.throws(testYamlService.WriteYaml);
        });
    });
    describe('CreateEntry', () => {
        it('should create a entry object from a string', () => {
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            assert.equal(mockEntry.question, mockResult.question);
            assert.equal(mockEntry.answer, mockResult.answer);
            assert.deepEqual(mockEntry.dateClosed, mockResult.dateClosed);
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