import { EventLogLevel } from '../+common/filters.model';
import { EventVM } from './eventVM';

export interface EventPagedResponseVM {
    events: EventVM[];
    page: number;
    pageSize: number;
    totalNumber: number;
    sort: string;
    sortDirection: string;
    dateFrom: Date;
    dateTo: Date;
    logLevels: EventLogLevel;
}