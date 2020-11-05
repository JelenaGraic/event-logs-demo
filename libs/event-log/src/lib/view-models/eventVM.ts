import { EventLogLevel } from '../+common/filters.model';

export interface EventVM {
    id: number;
    name: string;
    payload: string;
    logLevel: EventLogLevel;
    time: number;
}