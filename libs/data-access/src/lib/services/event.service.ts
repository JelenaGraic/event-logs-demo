import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { EventDto } from '../dto-models/eventDto';
import { EventPagedResponseDto } from '../dto-models/eventPagedResponseDto';
import { EventLogLevel } from '../dto-models/logLevels.model';


const EVENTS: EventDto[] = [{id: 0, name: 'ev1', payload: 'payl1', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 1, name: 'ev2', payload: 'payl2', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 2, name: 'ev3', payload: 'payl3', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 3, name: 'ev4', payload: 'payl4', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 4, name: 'ev5', payload: 'payl5', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 5, name: 'ev6', payload: 'payl6', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 6, name: 'ev7', payload: 'payl7', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 7, name: 'ev8', payload: 'payl8', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 8, name: 'ev9', payload: 'payl9', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 9, name: 'ev10', payload: 'payl10', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 10, name: 'ev11', payload: 'payl11', logLevel: EventLogLevel.alarm, time: Date.now()},
                         {id: 11, name: 'ev12', payload: 'payl12', logLevel: EventLogLevel.alarm, time: Date.now()}
                        ]

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor() { }

  getPagedResponse (page: number, size: number, sortField: string, sortDirection: string, dateFrom: Date, 
                    dateTo: Date, logLevels: EventLogLevel): Observable<EventPagedResponseDto> {

    let eventPagedRes: EventPagedResponseDto = {
      events: EVENTS.slice((page*size - size), (page*size)),
      totalNumber: EVENTS.length,
      page: page,
      pageSize: size,
      sort: sortField,
      sortDirection: sortDirection,
      dateFrom: dateFrom,
      dateTo: dateTo,
      logLevels: logLevels
    }
    return of(eventPagedRes);
  }

}