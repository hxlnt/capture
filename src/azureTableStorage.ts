import azure = require('azure-storage');
import {v4 as uuid} from 'uuid';
import {IBook, IEntry, IQuestion, IStorageService} from '../src/interfaces';

export default class AzureTableStorage implements IStorageService {

    private storageService: azure.TableService;
    constructor() {
        this.storageService = azure.createTableService();
    }

    public GetAllEntries(): IEntry[] {
        console.log(this.storageService);
        throw new Error();
    }

    public GetAllQuestions(): IQuestion[] {
        console.log(this.storageService);
        throw new Error();
    }

    public GetAllBooks(): IBook[] {
        console.log(this.storageService);
        throw new Error();
    }

    public AddQuestion(question: IQuestion): string {
        const CURRENT_DATE = new Date();
        const DEFAULT_ANSWER = '';
        const NULL_DATE = new Date(0);
        const entGen = azure.TableUtilities.entityGenerator;
        const entity = {
            PartitionKey: entGen.String('question'),
            RowKey: entGen.String(uuid()),
            answer: DEFAULT_ANSWER,
            dateClosed: NULL_DATE,
            dateOpened: CURRENT_DATE,
            question,
        };
        this.storageService.insertEntity('question', entity, (error, result, response) => {
            // TODO
            if (!error) {
                return result['.metadata'].etag;
            } else { return 'Error!'; }
        });
        return 'TODO';
    }

    AddQuestion: (question: IQuestion) => string;
    AddBook: (book: IBook) => string;

    RemoveQuestion: (guid: string) => null;
    RemoveBook: (guid: string) => null;

    EditQuestion: (guid: string) => IQuestion;
    EditBook: (guid: string) => IBook;


}

