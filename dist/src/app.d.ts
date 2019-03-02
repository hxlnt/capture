export default class YamlService {
    ReadYaml(path: string): any;
    WriteYaml(entry: IQuestion): string;
    CreateEntry(question: string): IQuestion;
}
export interface IQuestion {
    question: string;
    answer: string;
    dateOpened: Date;
    dateClosed: Date;
}
//# sourceMappingURL=app.d.ts.map