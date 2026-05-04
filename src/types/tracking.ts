export interface TrackingHistoryType {
  _id: string;
  shipmentId: string;
  location: string;
  status: string;
  description?: string;
  date: string;
}
