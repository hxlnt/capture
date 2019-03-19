"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CreateEntry(question) {
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
exports.CreateEntry = CreateEntry;
//# sourceMappingURL=entry.js.map