import YAML = require('yamljs');

export default class YamlService {

    public ReadYaml(path: string) {
        return YAML.load(path);
    }

    public WriteYaml(entry: IQuestion): string {
        return YAML.stringify(entry, 4);
    }

    public CreateEntry(question: string): IQuestion {

        const DEFAULT_ANSWER = 'This question has not been answered yet.';

        return {
            question,
            answer: DEFAULT_ANSWER,
            dateOpened: new Date(),
            dateClosed: new Date(0),
        };

    }

    // public EditEntry(entry: IQuestion, question?: string, answer?: string, dateClosed?: Date): IQuestion {

    //     return {
    //         question,
    //         answer: DEFAULT_ANSWER,
    //         dateOpened: new Date(),
    //         dateClosed: new Date(0),
    //     };
    // }

}

export interface IQuestion {

    question: string;
    answer: string;
    dateOpened: Date;
    dateClosed: Date;

}
