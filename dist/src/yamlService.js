"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const YAML = require("yamljs");
class YamlService {
    ReadYaml(path) {
        return YAML.load(path);
    }
    AddEntryToYaml(entry, path) {
        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(path, entryAsYaml);
        const newYaml = this.ReadYaml(path);
        return newYaml.length - 1;
    }
    RemoveEntryFromYaml(entryIndex, path) {
        let yaml = this.ReadYaml(path);
        if (yaml.length > 1) {
            yaml.splice(entryIndex, 1);
            yaml = YAML.stringify(yaml, undefined, 2);
            fs.writeFileSync(path, yaml);
        }
        else {
            fs.writeFileSync(path, '');
        }
    }
    EditEntryInYaml(entryIndex, path, question, answer) {
        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) {
            yamlEntry.question = question;
        }
        if (answer) {
            yamlEntry.answer = answer;
            if (answer != ' ') {
                yamlEntry.dateClosed = new Date().toISOString();
            }
        }
        const array = [];
        array[0] = yamlEntry;
        if (this.ReadYaml(path)[1]) {
            this.RemoveEntryFromYaml(entryIndex, path);
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(path, editedEntryAsYaml);
        }
        else {
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(path, editedEntryAsYaml);
            this.RemoveEntryFromYaml(0, path);
        }
    }
    SortEntriesInYaml(path) {
        let yaml = this.ReadYaml(path);
        let yamlSorted = yaml.sort((a, b) => (a.dateOpened > b.dateOpened) ? 1 : ((b.dateOpened > a.dateOpened) ? -1 : 0));
        fs.writeFileSync(path, YAML.stringify(yamlSorted, undefined, 2));
    }
    CreateFile(path) {
        const isFileCreated = fs.existsSync(path);
        if (!isFileCreated) {
            fs.writeFileSync(path, '');
        }
        return isFileCreated;
    }
    DeleteFile(path) {
        let result = `File ${path} deleted.`;
        try {
            fs.unlinkSync(path);
        }
        catch (_a) {
            result = `File ${path} does not exist; no action taken.`;
        }
        return result;
    }
    CreateEntry(question) {
        const DEFAULT_ANSWER = '';
        const NULL_DATE = new Date(0);
        const CURRENT_DATE = new Date();
        return {
            question,
            answer: DEFAULT_ANSWER,
            dateOpened: CURRENT_DATE.toISOString(),
            dateClosed: NULL_DATE.toISOString(),
        };
    }
}
exports.default = YamlService;
//# sourceMappingURL=yamlService.js.map