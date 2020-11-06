export class EventLogVM {
    timestamp: number;
    sourceType: string;
    type: string;
    data: string;

    constructor(timestamp: number, sourceType: string, type: string, data: string) {
        this.timestamp = timestamp;
        this.sourceType = sourceType;
        this.type = type;
        this.data = data;
    }
}