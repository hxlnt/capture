export default class YamlService {
    ReadYaml(path: string): any;
    WriteYaml(entry: IQuestion, path: string): void;
    CreateEntry(question: string): IQuestion;
}
export interface IQuestion {
    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;
}
//# sourceMappingURL=app.d.ts.map