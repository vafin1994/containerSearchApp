export interface ContainerInfo {
  'id': string;
  'owner': string;
  'history': ContainerHistoryEvent[];
}

export interface ContainerHistoryEvent {
  'dateFrom': string;
  'dateTo': string;
  'sourcePort': string;
  'destinationPort': string;
  'sender': string;
  'recipient': string;
}
