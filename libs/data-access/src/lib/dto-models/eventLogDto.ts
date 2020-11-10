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