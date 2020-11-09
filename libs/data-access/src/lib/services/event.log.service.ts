import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventLogDto } from '../dto-models/eventLogDto';
import { EventLogPagedResponseDto } from '../dto-models/eventLogPagedResponseDto';


const EVENT_LOGS: EventLogDto[] = [{originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'SEMANTIC', originId: 5678, timestamp: new Date().getTime(), sourceType: 'SEMANTIC', type: 'DELETED', data: 'OFFLINE'},
                                   {originType: 'DEVICE', originId: 12345, timestamp: new Date().getTime(), sourceType: 'DEVICE_ACTUATOR', type: 'DELETED', data: 'OFFLINE'}
                                  ]

@Injectable({
  providedIn: 'root'
})
export class EventLogService {


  constructor() { }

  getPagedResponse (page: number, size: number, from: Date, to: Date): Observable<EventLogPagedResponseDto> {
    const eventLogPagedResponse: EventLogPagedResponseDto = {
      eventLogs: EVENT_LOGS,
      totalNumber: EVENT_LOGS.length,
      page: page,
      pageSize: size,
      from: from,
      to: to
    }
      return of(eventLogPagedResponse);
  }

}