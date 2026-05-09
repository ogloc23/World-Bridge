import TrackingRepository from "../repositories/tracking.repo";
import ShipmentService from "./shipment.service";
import mongoose from "mongoose";

const trackingRepo = new TrackingRepository();
const shipmentService = new ShipmentService();

class TrackingService {
  // Track shipment by tracking ID
  async trackShipment(trackingId: string) {
    const shipment = await shipmentService.getShipmentByTrackingId(trackingId);
    if (!shipment) {
      throw new Error("Shipment not found");
    }

    const history = await trackingRepo.findMany({ shipmentId: shipment._id });
    const eventLog = history.map((entry) => ({
      status: entry.status,
      location: entry.location,
    }));

    return {
      shipment,
      eventLog,
    };
  }

  // Add tracking history (for internal use, e.g., when status updates)
  async addTrackingHistory(data: {
    shipmentId: string;
    location: string;
    status: string;
    description?: string;
  }) {
    const tracking = await trackingRepo.create({
      ...data,
      shipmentId: new mongoose.Types.ObjectId(data.shipmentId),
      date: new Date(),
    });
    return tracking;
  }
}

export default TrackingService;
