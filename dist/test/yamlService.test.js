"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const entry = require("../src/entry");
const yamlService_1 = require("../src/yamlService");
describe('YamlService', () => {
    const testQuestionPath = 'test/data/test.yaml';
    const testYamlService = new yamlService_1.default(testQuestionPath);
    const mockResult = {
        answer: '',
        dateClosed: '1970-01-01T00:00:00.000Z',
        dateOpened: '2019-03-02T06:59:04.436Z',
        question: 'What is 1+1?',
    };
    describe('DeleteYamlFile', () => {
        it('should delete existing YAML file.', () => {
            const testResult = testYamlService.DeleteFile();
            assert.equal(testResult, `File ${testQuestionPath} deleted.`);
        });
        it('should return a friendly message if trying to delete a file that doesn\'t exist.', () => {
            const testResult = testYamlService.DeleteFile();
            assert.equal(testResult, `File ${testQuestionPath} does not exist; no action taken.`);
        });
    });
    describe('CreateYamlFile', () => {
        it('should create a new YAML file if one does not exist', () => {
            const testIsFileCreated = testYamlService.CreateFile();
            assert.equal(testIsFileCreated, false);
        });
        it('should not create a new YAML file if one already exists', () => {
            const testIsFileCreated = testYamlService.CreateFile();
            assert.equal(testIsFileCreated, true);
        });
    });
    describe('AddEntryToYaml', () => {
        it('should write the first entry in test.yaml', () => {
            const mockEntry = entry.CreateEntry('What is 1+1?');
            const entryIndex = testYamlService.AddEntryToYaml(mockEntry);
            const mockRead = testYamlService.ReadYaml();
            assert.equal(mockRead[0].question, mockResult.question);
            assert.equal(mockRead[0].answer, mockResult.answer);
            assert.deepEqual(mockRead[0].dateClosed, mockResult.dateClosed);
            // There should be one entry in the file.
            assert.equal(entryIndex, 0);
        });
        it('should write a second entry to the top of test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml();
            const mockEntry = entry.CreateEntry('What is 2+2?');
            const entryIndex = testYamlService.AddEntryToYaml(mockEntry);
            const mockRead2 = testYamlService.ReadYaml();
            assert.equal(mockRead1.length + 1, mockRead2.length);
            assert.deepEqual(mockRead2[mockRead2.length - 1], mockEntry);
            // There should be two entries in the file.
            assert.equal(entryIndex, 1);
            assert.equal(mockRead2[entryIndex].question, 'What is 2+2?');
        });
    });
    describe('ReadYaml', () => {
        it('should read two entries test.yaml', () => {
            const mockRead = testYamlService.ReadYaml();
            assert.equal(mockRead[0].question, mockResult.question);
            assert.equal(mockRead.length, 2);
        });
    });
    describe('EditEntryInYaml', () => {
        it('should edit just a question in test.yaml', () => {
            testYamlService.EditEntryInYaml(0, 'What is 1 plus 1?', undefined);
            const mockRead1 = testYamlService.ReadYaml();
            // It should add the entry to the end of the file after editing
            assert.equal(mockRead1[1].question, 'What is 1 plus 1?');
            assert.equal(mockRead1[1].answer, '');
        });
        it('should edit just an answer in test.yaml', () => {
            testYamlService.EditEntryInYaml(1, undefined, 'two');
            const mockRead1 = testYamlService.ReadYaml();
            assert.equal(mockRead1[1].question, 'What is 1 plus 1?');
            assert.equal(mockRead1[1].answer, 'two');
        });
    });
    describe('SortEntriesInYaml', () => {
        it('should sort the YAML file by date', () => {
            testYamlService.SortEntriesInYaml();
        });
        it('should reverse the order of the entries', () => {
            const mockRead = testYamlService.ReadYaml();
            assert.equal(mockRead[0].answer, '');
        });
    });
    describe('RemoveEntryFromYaml', () => {
        it('should remove bottom-most entry from test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml();
            testYamlService.RemoveEntryFromYaml(mockRead1.length - 1);
            const mockRead2 = testYamlService.ReadYaml();
            assert.deepEqual(mockRead1[0], mockRead2[0]);
            assert.equal(mockRead1.length - 1, mockRead2.length);
        });
        it('should edit remaining entry from test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml();
            testYamlService.EditEntryInYaml(0, 'Another edit');
            const mockRead2 = testYamlService.ReadYaml();
            assert.notEqual(mockRead1[0].question, mockRead2[0].question);
            assert.equal(mockRead2[0].question, 'Another edit');
        });
        it('should remove remaining entry from test.yaml', () => {
            const mockRead1 = testYamlService.ReadYaml();
            testYamlService.RemoveEntryFromYaml(mockRead1[0]);
            const mockRead2 = testYamlService.ReadYaml();
            assert.notEqual(mockRead1, mockRead2);
            assert.equal(mockRead2, null);
        });
    });
});
//# sourceMappingURL=yamlService.test.js.map