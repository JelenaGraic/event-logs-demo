import { EventLogDto } from '@event-logs/data-access';

export class EventLogVM {
    timestamp: number;
    sourceType: string;
    type: string;
    data: string;

    constructor(eventLog: EventLogDto) {
        this.timestamp = eventLog.timestamp;
        this.sourceType = eventLog.sourceType;
        this.type = eventLog.type;
        this.data = eventLog.data;
    }
}