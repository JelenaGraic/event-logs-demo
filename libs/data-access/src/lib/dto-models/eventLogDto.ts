export class EventLogDto {
    originType: string;
    originId: number;
    timestamp: number;
    sourceType: string;
    type: string;
    data: string;
  
    constructor(originType: string, originId: number, timestamp: number, sourceType: string, type: string, data: string) {
        this.originType = originType;
        this.originId = originId;
        this.timestamp = timestamp;
        this.sourceType = sourceType;
        this.type = type;
        this.data = data;
    }
  }

//   Origintype - type of where an event originated from, for example DEVICE, SEMANTIC, etc..
// Originid - id of respected origin type
// Timestamp - A moment in time when an event occurred - number of milliseconds since the standard base time known as the epoch: January 1 1970 at 00:00:00 GMT.
// Sourcetype - Similar to origintype, this denotes detailed information where the event occurred. If the event is propagated from lower level origin to a higher level origin, then sourcetype is different from origintype (otherwise it is the same as origin type). For example, event originType could be DEVICE but sourceType could be DEVICE_SENSOR. That way, sourceType gives more precise info where inside the originType event has happened.
// Type - Event type
// Data - Detailed information of the event

