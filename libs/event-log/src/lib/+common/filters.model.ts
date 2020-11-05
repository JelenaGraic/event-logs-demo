export interface Filter {
    dateFrom: Date;
    dateTo: Date;
    logLevels: EventLogLevel;
  }

  
export enum EventLogLevel {
  all,
  info,
  warning,
  alarm
}