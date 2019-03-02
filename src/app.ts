import fs = require('fs');
import YAML = require('yamljs');

export default class YamlService {

    public ReadYaml(path: string) {
        return YAML.load(path);
    }

    public WriteYaml(entry: IQuestion, path: string) {
        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(path, entryAsYaml);
    }

    public CreateEntry(question: string): IQuestion {

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

export interface IQuestion {

    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;

}
