import { EventDto } from './eventDto';
import { EventLogLevel } from './logLevels.model';

export class EventPagedResponseDto {
    events: EventDto[];
    page: number;
    pageSize: number;
    totalNumber: number;
    sort: string;
    sortDirection: string;
    dateFrom: Date;
    dateTo: Date;
    logLevels: EventLogLevel;

    constructor(events: EventDto[], page: number, pageSize: number, totalNumber: number, sort: string, sortDirection: string,
                dateFrom: Date, dateTo: Date, search: EventLogLevel) {
        this.events = events;
        this.page = page;
        this.pageSize = pageSize;
        this.totalNumber = totalNumber;
        this.sort = sort;
        this.sortDirection = sortDirection;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.logLevels = search;
    }
}