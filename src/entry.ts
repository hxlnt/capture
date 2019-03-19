
export function CreateEntry(question: string): IQuestion {
    const CURRENT_DATE = new Date();
    const DEFAULT_ANSWER = '';
    const NULL_DATE = new Date(0);

    return {
        answer: DEFAULT_ANSWER,
        dateClosed: NULL_DATE.toISOString(),
        dateOpened: CURRENT_DATE.toISOString(),
        question,
    };
}

export interface IQuestion {

    question: string;
    answer: string;
    dateOpened: string;
    dateClosed: string;

}
