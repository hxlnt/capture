import fs = require('fs');
import YAML = require('yamljs');
import { IQuestion } from '../src/entry';

export default class YamlService {

    private questionPath: string;
    constructor( questionPath: string) {
        this.questionPath = questionPath;
    }

    public CreateFile(): boolean {
        const isFileCreated = fs.existsSync(this.questionPath);
        if (!isFileCreated) { fs.writeFileSync(this.questionPath, ''); }
        return isFileCreated;
    }
    public DeleteFile(): string {
        let result = `File ${this.questionPath} deleted.`;
        try {
            fs.unlinkSync(this.questionPath);
        } catch {
            result = `File ${this.questionPath} does not exist; no action taken.`;
        }
        return result;
    }

    public ReadYaml(): any {
        return YAML.load(this.questionPath);
    }

    public AddEntryToYaml(entry: IQuestion): number {

        const array = [];
        array[0] = entry;
        const entryAsYaml = YAML.stringify(array, undefined, 2);

        fs.appendFileSync(this.questionPath, entryAsYaml);

        const newYaml = this.ReadYaml();
        return newYaml.length - 1;

    }

    public RemoveEntryFromYaml(entryIndex: number) {

        let yaml = this.ReadYaml();
        if (yaml.length > 1) {
            yaml.splice(entryIndex, 1);
            yaml = YAML.stringify(yaml, undefined, 2);
            fs.writeFileSync(this.questionPath, yaml);
        } else { fs.writeFileSync(this.questionPath, ''); }

    }

    public SortEntriesInYaml() {

        const yaml = this.ReadYaml();

        const yamlSorted = yaml.sort(
            (a: IQuestion, b: IQuestion) =>
                (a.dateOpened < b.dateOpened) ? 1 : ((b.dateOpened < a.dateOpened) ? -1 : 0));
        fs.writeFileSync(this.questionPath, YAML.stringify(yamlSorted, undefined, 2));

    }

    public EditEntryInYaml(entryIndex: number, question?: string, answer?: string) {

        const yamlEntry = this.ReadYaml()[entryIndex];
        if (question) { yamlEntry.question = question; }
        if (answer) {
            yamlEntry.answer = answer;
            if (answer !== ' ') { yamlEntry.dateClosed = new Date().toISOString(); }
        }
        const array = [];
        array[0] = yamlEntry;
        if (this.ReadYaml()[1]) {
            this.RemoveEntryFromYaml(entryIndex);
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(this.questionPath, editedEntryAsYaml);
        } else {
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(this.questionPath, editedEntryAsYaml);
            this.RemoveEntryFromYaml(0);
        }
    }
}

