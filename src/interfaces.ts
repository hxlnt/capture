export interface IStorageService {

    GetAllEntries: () => IEntry[];
    GetAllQuestions: () => IQuestion[];
    GetAllBooks: () => IBook[];

    AddQuestion: (question: IQuestion) => string;
    AddBook: (book: IBook) => string;

    RemoveQuestion: (guid: string) => null;
    RemoveBook: (guid: string) => null;

    EditQuestion: (guid: string) => IQuestion;
    EditBook: (guid: string) => IBook;

}

export interface IEntry {

    partitionKey: string;
    rowKey: string;
    dateOpened: string;
    dateClosed: string;

}

export interface IQuestion extends IEntry {

    question: string;
    answer?: string;

}

export interface IBook extends IEntry {

    title: string;
    author?: string;
    currentPage: number;
    totalPages: number;

}
