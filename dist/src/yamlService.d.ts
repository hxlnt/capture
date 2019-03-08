export default class YamlService {
    ReadYaml(path: string): any;
    AddEntryToYaml(entry: IQuestion, path: string): number;
    RemoveEntryFromYaml(entryIndex: number, path: string): void;
    EditEntryInYaml(entryIndex: number, path: string, question?: string, answer?: string): void;
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