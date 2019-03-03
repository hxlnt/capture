import fs = require('fs');
import YAML = require('yamljs');

export default class YamlService {

    public ReadYaml(path: string) {

        return YAML.load(path);

    }

    public AddEntryToYaml(entry: IQuestion, path: string) {

        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);

        fs.appendFileSync(path, entryAsYaml);

    }

    public RemoveEntryFromYaml(entryIndex: number, path: string) {

        let yaml = this.ReadYaml(path);

        yaml.splice(entryIndex, 1);
        yaml = YAML.stringify(yaml, undefined, 2);
        fs.writeFileSync(path, yaml);

    }

    public EditEntryInYaml(entryIndex: number, path: string, question: string, answer: string) {

        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) { yamlEntry.question = question; }
        if (answer) { yamlEntry.answer = answer; }
        this.RemoveEntryFromYaml(entryIndex, path);
        const array = [];
        array[0] = yamlEntry;
        const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
        fs.appendFileSync(path, editedEntryAsYaml);

    }

    public CreateFile(path: string): boolean {

        const isFileCreated = fs.existsSync(path);

        if (!isFileCreated) { fs.writeFileSync(path, '# YAML FILE\n'); }

        return isFileCreated;

    }

    public DeleteFile(path: string): string {
        let result = `File ${path} deleted.`;
        try { fs.unlinkSync(path); } catch { result = `File ${path} does not exist; no action taken.`; }
        return result;
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
