export class EventDto {
    id: number;
    name: string;
    payload: string;
    logLevel: string;
    time: number;
  
    constructor(obj?: any) {
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || '';
        this.payload = obj && obj.payload || '';
        this.logLevel = obj && obj.logLavel || '';
        this.time = obj && obj.time || 0;
    }
  }