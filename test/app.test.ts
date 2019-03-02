import YamlService from '../src/app';
import assert = require('assert');

describe('YamlService', () => {

    let testYamlService: YamlService;
    const mockResult = {
        question: 'What is 1+1?',
        answer: 'This question has not been answered yet.',
        dateOpened: '2019-03-02T06:59:04.436Z',
        dateClosed: '1970-01-01T00:00:00.000Z',
    };

    beforeEach(() => { testYamlService = new YamlService(); });

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
            const mockEntry = testYamlService.CreateEntry('What is 1+1?');
            testYamlService.WriteYaml(mockEntry, './test/data/test.yaml');
            const mockRead2 = testYamlService.ReadYaml('./test/data/test.yaml');
            // Object should be appended to the end of the file without altering existing content.
            assert.deepEqual(mockRead1[0], mockRead2[0]);
            assert.equal(mockRead1.length + 1, mockRead2.length);
            assert.deepEqual(mockRead2[mockRead2.length - 1], mockEntry);
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

});
