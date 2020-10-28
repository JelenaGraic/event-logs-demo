import { EventDto } from './eventDto';

export class EventPagedResponse {
    events: EventDto[];
    page: number;
    pageSize: number;
    totalNumber: number;

    constructor(obj?: any) {
        this.events = obj && obj.events || undefined;
        this.page = obj && obj.page || 0;
        this.pageSize = obj && obj.pageSize || 0;
        this.totalNumber = obj && obj.totalNumber || 0;
    }
}