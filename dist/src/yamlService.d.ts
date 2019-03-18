import { IQuestion } from '../src/entry';
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
//# sourceMappingURL=yamlService.d.ts.map