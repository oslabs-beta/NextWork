export interface QueryParam {
  name: string;
  value: string;
}

export interface Creator {
  name: string;
  version: string;
}

export interface PageTimings {
  onContentLoad: number;
  onLoad: number;
}

export interface PageInfo {
  startedDateTime?: string;
  id?: string;
  title?: string;
  pageTimings?: PageTimings;
}

export interface HarLogEntry {
  pageref?: string;
  startedDateTime?: string;
  time?: number;
  request?: any;
  response?: any;
  cache?: any;
  timings?: any;
  serverIPAddress?: string;
  connection?: string;
  comment?: string;
}

export interface HarLog {
  version?: string;
  creator?: Creator;
  pages?: PageInfo[];
  entries?: HarLogEntry[];
}
