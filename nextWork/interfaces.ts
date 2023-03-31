export interface Cookie {
  name: string;
  value: string;
}

export interface Param {
  key: string;
  value: string;
}

export interface AddRequest {
  customHarAgentEnabled?: boolean;
}
