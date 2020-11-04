export class EventDto {
    id: number;
    name: string;
    payload: string;
    logLevel: string;
    time: number;
  
    constructor(id: number, name: string, payload: string, logLevel: string, time: number) {
        this.id = id;
        this.name = name;
        this.payload = payload;
        this.logLevel = logLevel;
        this.time = time;
    }
  }