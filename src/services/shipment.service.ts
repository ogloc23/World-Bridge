import ShipmentRepository from "../repositories/shipment.repo";
import { generateTrackingId } from "../utils/generateTrackingId";

const shipmentRepo = new ShipmentRepository();

class ShipmentService {
  // Get all shipments
  async getAllShipments() {
    return shipmentRepo.findMany({});
  }

  // Get shipment by tracking ID
  async getShipmentByTrackingId(trackingId: string) {
    return shipmentRepo.findOne({ trackingId });
  }

  // Create a new shipment
  async createShipment(data: {
    senderName: string;
    receiverName: string;
    originPort: string;
    destination: string;
    currentLocation: string;
    weight: number;
    carrier?: string;
    shipmentDate: string;
    deliveryDate?: string;
  }) {
    const trackingId = generateTrackingId();
    const shipment = await shipmentRepo.create({
      ...data,
      trackingId,
      shipmentDate: new Date(data.shipmentDate),
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
    });
    return shipment;
  }

  // Update shipment status
  async updateShipmentStatus(data: {
    trackingId: string;
    status: string;
    currentLocation: string;
  }) {
    const shipment = await shipmentRepo.update(
      { trackingId: data.trackingId },
      { status: data.status, currentLocation: data.currentLocation },
    );
    return shipment;
  }
}

export default ShipmentService;
