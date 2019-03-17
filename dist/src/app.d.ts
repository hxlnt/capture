import YamlService from '../src/yamlService';
export default class App {
    private storageService;
    private questionPath;
    constructor(storageService: YamlService, questionPath: string);
    capMain(): void;
    capShowEntry(entryIndex: number): void;
    capEditQuestion(entryIndex: number): void;
    capAddQuestion(): void;
    capAddAnswer(entryIndex: number): void;
    capDeleteQuestion(entryIndex: number): void;
    capFilterEntries(tag: string): void;
}
//# sourceMappingURL=app.d.ts.map