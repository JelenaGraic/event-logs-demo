import { EventVM } from './eventVM';

export interface EventPagedResponseVM {
    events: EventVM[];
    page: number;
    pageSize: number;
    totalNumber: number;
}