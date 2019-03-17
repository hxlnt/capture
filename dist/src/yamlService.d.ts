export default class YamlService {
    [x: string]: any;
    CreateFile(path: string): any;
    DeleteFile(path: string): any;
    ReadYaml(path: string): any;
    CreateEntry(question: string): any;
    AddEntryToYaml(entry: IQuestion, path: string): number;
    RemoveEntryFromYaml(entryIndex: number, path: string): void;
    EditEntryInYaml(entryIndex: number, path: string, question?: string, answer?: string, tags?: Array<string>): void;
    SortEntriesInYaml(path: string): void;
}
export interface IQuestion {
    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;
}
//# sourceMappingURL=yamlService.d.ts.map