export type ShipmentStatus =
  | "PENDING"
  | "IN_TRANSIT"
  | "ON_HOLD"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface ShipmentType {
  _id: string;
  trackingId: string;
  senderName: string;
  receiverName: string;
  originPort: string;
  destination: string;
  currentLocation: string;
  status: ShipmentStatus;
  weight: number;
  carrier?: string;
  shipmentDate: string;
  deliveryDate?: string;
  eventLog?: {
    status: ShipmentStatus;
    location: string;
  }[];
}
