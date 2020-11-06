import { EventLogVM } from './eventLogVM';

export class EventLogPagedResponseVM {
    events: EventLogVM[];
    page: number;
    pageSize: number;
    totalNumber: number;
    from: Date;
    to: Date;

    constructor(events: EventLogVM[], page: number, pageSize: number, totalNumber: number, from: Date, to: Date) {
        this.events = events;
        this.page = page;
        this.pageSize = pageSize;
        this.totalNumber = totalNumber;
        this.from = from;
        this.to = to;
    }
}