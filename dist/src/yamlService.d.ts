export default class YamlService {
    private questionPath;
    constructor(questionPath: string);
    CreateFile(): boolean;
    DeleteFile(): string;
    ReadYaml(): any;
    AddEntryToYaml(entry: IQuestion): number;
    RemoveEntryFromYaml(entryIndex: number): void;
    SortEntriesInYaml(): void;
    EditEntryInYaml(entryIndex: number, question?: string, answer?: string, tags?: string[]): void;
}
export interface IQuestion {
    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;
    tags: string[];
}
//# sourceMappingURL=yamlService.d.ts.map