export default class YamlService {
    AddEntryToYaml(entry: IQuestion, path: string): number;
    RemoveEntryFromYaml(entryIndex: number, path: string): void;
    EditEntryInYaml(entryIndex: number, path: string, question?: string, answer?: string): void;
    SortEntriesInYaml(path: string): void;
    ReadYaml(path: string): any;
    CreateFile(path: string): boolean;
    DeleteFile(path: string): string;
    CreateEntry(question: string): IQuestion;
}
export interface IQuestion {
    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;
}
//# sourceMappingURL=yamlService.d.ts.map