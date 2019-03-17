"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const YAML = require("yamljs");
class YamlService {
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
    ReadYaml(path) {
        return YAML.load(path);
    }
    CreateEntry(question) {
        const CURRENT_DATE = new Date();
        const DEFAULT_ANSWER = '';
        const NULL_DATE = new Date(0);
        return {
            answer: DEFAULT_ANSWER,
            dateClosed: NULL_DATE.toISOString(),
            dateOpened: CURRENT_DATE.toISOString(),
            question,
        };
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
    EditEntryInYaml(entryIndex, path, question, answer, tags) {
        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) {
            yamlEntry.question = question;
        }
        if (answer) {
            yamlEntry.answer = answer;
            if (answer !== ' ') {
                yamlEntry.dateClosed = new Date().toISOString();
            }
        }
        if (tags) {
            yamlEntry.tags = tags;
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
        const yaml = this.ReadYaml(path);
        const yamlSorted = yaml.sort((a, b) => (a.dateOpened < b.dateOpened) ? 1 : ((b.dateOpened < a.dateOpened) ? -1 : 0));
        fs.writeFileSync(path, YAML.stringify(yamlSorted, undefined, 2));
    }
}
exports.default = YamlService;
//# sourceMappingURL=yamlService.js.map