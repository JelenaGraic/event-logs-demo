import { EventDto } from './eventDto';

export class EventPagedResponseDto {
    events: EventDto[];
    page: number;
    pageSize: number;
    totalNumber: number;
    sort: string;
    sortDirection: string;
    dateFrom: Date;
    dateTo: Date;
    search: string;

    constructor(events: EventDto[], page: number, pageSize: number, totalNumber: number, sort: string, sortDirection: string,
                dateFrom: Date, dateTo: Date, search: string) {
        this.events = events;
        this.page = page;
        this.pageSize = pageSize;
        this.totalNumber = totalNumber;
        this.sort = sort;
        this.sortDirection = sortDirection;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.search = search;
    }
}