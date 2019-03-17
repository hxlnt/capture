import fs = require('fs');
import YAML = require('yamljs');

export default class YamlService {
    [x: string]: any;
    CreateFile(path: string): any {
        const isFileCreated = fs.existsSync(path);
        if (!isFileCreated) { fs.writeFileSync(path, ''); }
        return isFileCreated;
    }
    DeleteFile(path: string): any {
        let result = `File ${path} deleted.`;
        try { fs.unlinkSync(path); } catch { result = `File ${path} does not exist; no action taken.`; }
        return result;
    }
    ReadYaml(path: string): any {
        return YAML.load(path);
    }
    CreateEntry(question: string): any {
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
        } else { fs.writeFileSync(path, ''); }

    }

    public EditEntryInYaml(entryIndex: number, path: string, question?: string, answer?: string, tags?: Array<string>) {

        const yamlEntry = this.ReadYaml(path)[entryIndex];
        if (question) { yamlEntry.question = question; }
        if (answer) {
            yamlEntry.answer = answer;
            if (answer !== ' ') { yamlEntry.dateClosed = new Date().toISOString(); }
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
        } else {
            const editedEntryAsYaml = YAML.stringify(array, undefined, 2);
            fs.appendFileSync(path, editedEntryAsYaml);
            this.RemoveEntryFromYaml(0, path);
        }
    }

    public SortEntriesInYaml(path: string) {

        const yaml = this.ReadYaml(path);

        const yamlSorted = yaml.sort(
            (a: IQuestion, b: IQuestion) =>
                (a.dateOpened < b.dateOpened) ? 1 : ((b.dateOpened < a.dateOpened) ? -1 : 0));
        fs.writeFileSync(path, YAML.stringify(yamlSorted, undefined, 2));

    }

}

// export function CreateFile(path: string): boolean {

//     const isFileCreated = fs.existsSync(path);

//     if (!isFileCreated) { fs.writeFileSync(path, ''); }

//     return isFileCreated;

// }

// export function CreateEntry(question: string): IQuestion {

//     const CURRENT_DATE = new Date();
//     const DEFAULT_ANSWER = '';
//     const NULL_DATE = new Date(0);

//     return {
//         answer: DEFAULT_ANSWER,
//         dateClosed: NULL_DATE.toISOString(),
//         dateOpened: CURRENT_DATE.toISOString(),
//         question,
//     };

// }

// export function DeleteFile(path: string): string {

//     let result = `File ${path} deleted.`;

//     try { fs.unlinkSync(path); } catch { result = `File ${path} does not exist; no action taken.`; }

//     return result;

// }

// export function ReadYaml(path: string) {

//     return YAML.load(path);

// }

export interface IQuestion {

    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;

}
