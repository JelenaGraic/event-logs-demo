import { Injectable } from '@angular/core';
import { Event } from '@event-logs/event';
import { Observable, of } from 'rxjs';


const EVENTS: Event[] = [{id: 0, name: 'ev1', payload: 'payl1', logLevel: 'alarm', time: Date.now()},
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

  private events: Event[] = [];

  constructor() { 
    for (let event of EVENTS) {
      this.events.push(new Event(event));
    }
  }

  getAll (params? : any): Observable<Event[]> {
      return of (this.events.slice((params.page*params.pageSize - params.pageSize) , (params.page*params.pageSize)))
    }
  
  getTotalNumber () {
    return this.events.length;
  }

}