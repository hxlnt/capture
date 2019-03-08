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
        yaml.splice(entryIndex, 1);
        yaml = YAML.stringify(yaml, undefined, 2);
        fs.writeFileSync(path, yaml);
    }
    EditEntryInYaml(entryIndex, path, question, answer) {
        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) {
            yamlEntry.question = question;
        }
        if (answer) {
            yamlEntry.answer = answer;
        }
        this.RemoveEntryFromYaml(entryIndex, path);
        const array = [];
        array[0] = yamlEntry;
        const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(path, editedEntryAsYaml);
    }
    CreateFile(path) {
        const isFileCreated = fs.existsSync(path);
        if (!isFileCreated) {
            fs.writeFileSync(path, '# YAML FILE\n');
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
        const DEFAULT_ANSWER = 'This question has not been answered yet.';
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