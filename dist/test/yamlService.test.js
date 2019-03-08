"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yamlService_1 = require("../src/yamlService");
const assert = require("assert");
describe('YamlService', () => {
    const testYamlService = new yamlService_1.default();
    const mockResult = {
        question: 'What is 1+1?',
        answer: 'This question has not been answered yet.',
        dateOpened: '2019-03-02T06:59:04.436Z',
        dateClosed: '1970-01-01T00:00:00.000Z',
    };
    const mockYamlPath = './test/data/test.yaml';
    before(() => { console.log(testYamlService.DeleteFile(mockYamlPath)); });
    describe('CreateEntry', () => {
        it('should create a entry object from a string', () => {
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            assert.equal(mockEntry.question, mockResult.question);
            assert.equal(mockEntry.answer, mockResult.answer);
            assert.deepEqual(mockEntry.dateClosed, mockResult.dateClosed);
        });
    });
    describe('CreateYamlFile', () => {
        it('should create a new YAML file if one does not exist', () => {
            const testIsFileCreated = testYamlService.CreateFile(mockYamlPath);
            assert.equal(testIsFileCreated, false);
        });
        it('should not create a new YAML file if one already exists', () => {
            const testIsFileCreated = testYamlService.CreateFile(mockYamlPath);
            assert.equal(testIsFileCreated, true);
        });
    });
    describe('AddEntryToYaml', () => {
        it('should write the first entry in test.yaml', () => {
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            const entryIndex = testYamlService.AddEntryToYaml(mockEntry, mockYamlPath);
            const mockRead = testYamlService.ReadYaml(mockYamlPath);
            assert.equal(mockRead[0].question, mockResult.question);
            assert.equal(mockRead[0].answer, mockResult.answer);
            assert.deepEqual(mockRead[0].dateClosed, mockResult.dateClosed);
            // There should be one entry in the file.
            assert.equal(entryIndex, 0);
        });
        it('should write a second entry to the end of test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml(mockYamlPath);
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            const entryIndex = testYamlService.AddEntryToYaml(mockEntry, mockYamlPath);
            const mockRead2 = testYamlService.ReadYaml(mockYamlPath);
            assert.deepEqual(mockRead1[0], mockRead2[0]);
            assert.equal(mockRead1.length + 1, mockRead2.length);
            assert.deepEqual(mockRead2[mockRead2.length - 1], mockEntry);
            // There should be two entries in the file.
            assert.equal(entryIndex, 1);
        });
    });
    describe('ReadYaml', () => {
        it('should read two entries test.yaml', () => {
            const mockRead = testYamlService.ReadYaml(mockYamlPath);
            assert.equal(mockRead[0].question, mockResult.question);
            assert.equal(mockRead.length, 2);
        });
    });
    describe('EditEntryInYaml', () => {
        it('should edit just a question in test.yaml', () => {
            testYamlService.EditEntryInYaml(0, mockYamlPath, 'What is 4+4?', undefined);
            const mockRead1 = testYamlService.ReadYaml(mockYamlPath);
            // It should add the entry to the end of the file after editing
            assert.equal(mockRead1[1].question, 'What is 4+4?');
            assert.equal(mockRead1[1].answer, 'This question has not been answered yet.');
        });
        it('should edit just an answer in test.yaml', () => {
            testYamlService.EditEntryInYaml(1, mockYamlPath, undefined, '50,000?');
            const mockRead1 = testYamlService.ReadYaml(mockYamlPath);
            assert.equal(mockRead1[1].question, 'What is 4+4?');
            assert.equal(mockRead1[1].answer, '50,000?');
        });
    });
    describe('RemoveEntryFromYaml', () => {
        it('should remove last entry from test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml(mockYamlPath);
            testYamlService.RemoveEntryFromYaml(mockRead1.length - 1, mockYamlPath);
            const mockRead2 = testYamlService.ReadYaml(mockYamlPath);
            assert.deepEqual(mockRead1[0], mockRead2[0]);
            assert.equal(mockRead1.length - 1, mockRead2.length);
        });
    });
});
//# sourceMappingURL=yamlService.test.js.map