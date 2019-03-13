import YamlService from '../src/yamlService';
export default class App {
    storageService: YamlService;
    questionPath: string;
    constructor(storageService: YamlService, questionPath: string);
    capMain(): void;
    capShowEntry(entryIndex: number): void;
    capEditQuestion(entryIndex: number): void;
    capAddQuestion(): void;
    capAddAnswer(entryIndex: number): void;
    deleteQuestion(entryIndex: number): void;
}
//# sourceMappingURL=app.d.ts.map