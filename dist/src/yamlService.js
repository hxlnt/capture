"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const YAML = require("yamljs");
class YamlService {
    constructor(questionPath) {
        this.questionPath = questionPath;
    }
    CreateFile() {
        const isFileCreated = fs.existsSync(this.questionPath);
        if (!isFileCreated) {
            fs.writeFileSync(this.questionPath, '');
        }
        return isFileCreated;
    }
    DeleteFile() {
        let result = `File ${this.questionPath} deleted.`;
        try {
            fs.unlinkSync(this.questionPath);
        }
        catch (_a) {
            result = `File ${this.questionPath} does not exist; no action taken.`;
        }
        return result;
    }
    ReadYaml() {
        return YAML.load(this.questionPath);
    }
    AddEntryToYaml(entry) {
        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(this.questionPath, entryAsYaml);
        const newYaml = this.ReadYaml();
        return newYaml.length - 1;
    }
    RemoveEntryFromYaml(entryIndex) {
        let yaml = this.ReadYaml();
        if (yaml.length > 1) {
            yaml.splice(entryIndex, 1);
            yaml = YAML.stringify(yaml, undefined, 2);
            fs.writeFileSync(this.questionPath, yaml);
        }
        else {
            fs.writeFileSync(this.questionPath, '');
        }
    }
    SortEntriesInYaml() {
        const yaml = this.ReadYaml();
        const yamlSorted = yaml.sort((a, b) => (a.dateOpened < b.dateOpened) ? 1 : ((b.dateOpened < a.dateOpened) ? -1 : 0));
        fs.writeFileSync(this.questionPath, YAML.stringify(yamlSorted, undefined, 2));
    }
    EditEntryInYaml(entryIndex, question, answer) {
        const yamlEntry = this.ReadYaml()[entryIndex];
        if (question) {
            yamlEntry.question = question;
        }
        if (answer) {
            yamlEntry.answer = answer;
            if (answer !== ' ') {
                yamlEntry.dateClosed = new Date().toISOString();
            }
        }
        const array = [];
        array[0] = yamlEntry;
        if (this.ReadYaml()[1]) {
            this.RemoveEntryFromYaml(entryIndex);
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(this.questionPath, editedEntryAsYaml);
        }
        else {
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(this.questionPath, editedEntryAsYaml);
            this.RemoveEntryFromYaml(0);
        }
    }
}
exports.default = YamlService;
//# sourceMappingURL=yamlService.js.map