"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const YAML = require("yamljs");
class YamlService {
    ReadYaml(path) {
        return YAML.load(path);
    }
    WriteYaml(entry, path) {
        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(path, entryAsYaml);
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
//# sourceMappingURL=app.js.map