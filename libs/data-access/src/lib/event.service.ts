import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventDto } from './eventDto';
import { EventPagedResponse } from './eventPagedResponse';
import { Filter } from '../../../event-log/src/lib/+common/filters.model';


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

  private eventsResponse: EventPagedResponse ={
    events: [],
    page: 1,
    pageSize: 5,
    totalNumber: 5
  };

  constructor() { 
    for (let event of EVENTS) {
      this.eventsResponse.events.push(new EventDto (event));
    }
    this.eventsResponse.totalNumber = this.eventsResponse.events.length;
  }

  getAll (page: number, pageSize: number, sort: string, sortDirection: string, filters?: Filter): Observable<EventPagedResponse> {

    let result = new EventPagedResponse(this.eventsResponse);   

    return of (new EventPagedResponse ({
      events: result.events.slice((page*pageSize - pageSize) , (page*pageSize)),
      totalNumber: result.totalNumber,
      page: result.page,
      pageSize: result.pageSize
    }))

    }

}