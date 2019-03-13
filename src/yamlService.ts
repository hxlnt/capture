import fs = require('fs');
import YAML = require('yamljs');

export default class YamlService {

    public ReadYaml(path: string) {

        return YAML.load(path);

    }

    public AddEntryToYaml(entry: IQuestion, path: string): number {

        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);

        fs.appendFileSync(path, entryAsYaml);

        const newYaml = this.ReadYaml(path);
        return newYaml.length - 1;

    }

    public RemoveEntryFromYaml(entryIndex: number, path: string) {

        let yaml = this.ReadYaml(path);
        if (yaml.length > 1) {
            yaml.splice(entryIndex, 1);
            yaml = YAML.stringify(yaml, undefined, 2);
            fs.writeFileSync(path, yaml);
        }
        else { fs.writeFileSync(path, ''); }

    }

    public EditEntryInYaml(entryIndex: number, path: string, question?: string, answer?: string) {

        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) { yamlEntry.question = question; }
        if (answer) { 
            yamlEntry.answer = answer; 
            if (answer != ' '){ yamlEntry.dateClosed = new Date().toISOString(); }
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

    public SortEntriesInYaml(path: string) {

        let yaml = this.ReadYaml(path);

        let yamlSorted = yaml.sort((a: IQuestion, b: IQuestion) => (a.dateOpened > b.dateOpened) ? 1 : ((b.dateOpened > a.dateOpened) ? -1 : 0)); 
        fs.writeFileSync(path, YAML.stringify(yamlSorted, undefined, 2));

    }

    public CreateFile(path: string): boolean {

        const isFileCreated = fs.existsSync(path);

        if (!isFileCreated) { fs.writeFileSync(path, ''); }

        return isFileCreated;

    }

    public DeleteFile(path: string): string {

        let result = `File ${path} deleted.`;

        try { fs.unlinkSync(path); } catch { result = `File ${path} does not exist; no action taken.`; }

        return result;

    }

    public CreateEntry(question: string): IQuestion {

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

export interface IQuestion {

    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;

}
