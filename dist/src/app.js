"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yamljs");
class YamlService {
    ReadYaml(path) {
        return YAML.load(path);
    }
    WriteYaml(entry) {
        return YAML.stringify(entry, 4);
    }
    CreateEntry(question) {
        const DEFAULT_ANSWER = 'This question has not been answered yet.';
        return {
            question,
            answer: DEFAULT_ANSWER,
            dateOpened: new Date(),
            dateClosed: new Date(0),
        };
    }
}
exports.default = YamlService;
//# sourceMappingURL=app.js.map