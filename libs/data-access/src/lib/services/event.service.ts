import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventDto } from '../dto-models/eventDto';
import { EventPagedResponseDto } from '../dto-models/eventPagedResponseDto';


const EVENTS: EventDto[] = [{id: 0, name: 'ev1', payload: 'payl1', logLevel: 'alarm', time: Date.now()},
                         {id: 1, name: 'ev2', payload: 'payl2', logLevel: 'info', time: Date.now()},
                         {id: 2, name: 'ev3', payload: 'payl3', logLevel: 'worning', time: Date.now()},
                         {id: 3, name: 'ev4', payload: 'payl4', logLevel: 'alarm', time: Date.now()},
                         {id: 4, name: 'ev5', payload: 'payl5', logLevel: 'info', time: Date.now()},
                         {id: 5, name: 'ev6', payload: 'payl6', logLevel: 'worning', time: Date.now()},
                         {id: 6, name: 'ev7', payload: 'payl7', logLevel: 'alarm', time: Date.now()},
                         {id: 7, name: 'ev8', payload: 'payl8', logLevel: 'info', time: Date.now()},
                         {id: 8, name: 'ev9', payload: 'payl9', logLevel: 'worning', time: Date.now()},
                         {id: 9, name: 'ev10', payload: 'payl10', logLevel: 'alarm', time: Date.now()},
                         {id: 10, name: 'ev11', payload: 'payl11', logLevel: 'info', time: Date.now()},
                         {id: 11, name: 'ev12', payload: 'payl12', logLevel: 'worning', time: Date.now()}
                        ]

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor() { }

  getAll (): Observable<EventDto[]> {
      return of(EVENTS) ;
  }

  getPagedResponse (page= 0, size= 5, sortField= "name", sortDirection= "asc", dateFrom= null, dateTo = new Date(Date.now()), search= ''): Observable<EventPagedResponseDto> {

    let eventPagedRes: EventPagedResponseDto = {
      events: EVENTS.slice((page*size - size), (page*size)),
      totalNumber: EVENTS.length,
      page: page,
      pageSize: size,
      sort: sortField,
      sortDirection: sortDirection,
      dateFrom: dateFrom,
      dateTo: dateTo,
      search: search
    }
    return of (eventPagedRes);
  }

}