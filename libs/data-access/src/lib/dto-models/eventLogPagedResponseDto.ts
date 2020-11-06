import { EventLogDto } from './eventLogDto';

export class EventLogPagedResponseDto {
    eventLogs: EventLogDto[];
    page: number;
    pageSize: number;
    totalNumber: number;
    from: Date;
    to: Date;

    constructor(eventLogs: EventLogDto[], page: number, pageSize: number, totalNumber: number,
                from: Date, to: Date) {
        this.eventLogs = eventLogs;
        this.page = page;
        this.pageSize = pageSize;
        this.totalNumber = totalNumber;
        this.from = from;
        this.to = to;
    }
}