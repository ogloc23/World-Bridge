import mongoose from "mongoose";
import ShipmentRepository from "../repositories/shipment.repo";
import { generateTrackingId } from "../utils/generateTrackingId";

const shipmentRepo = new ShipmentRepository();

class ShipmentService {
  // Get shipments according to admin role
  async getAllShipments(admin: { _id: string; role: "SUPER_ADMIN" | "ADMIN" }) {
    if (admin.role === "SUPER_ADMIN") {
      return shipmentRepo.findMany({});
    }

    return shipmentRepo.findMany({ createdBy: admin._id });
  }

  // Get shipment by tracking ID
  async getShipmentByTrackingId(
    trackingId: string,
    admin?: { _id: string; role: "SUPER_ADMIN" | "ADMIN" },
  ) {
    if (!admin || admin.role === "SUPER_ADMIN") {
      return shipmentRepo.findOne({ trackingId });
    }

    return shipmentRepo.findOne({ trackingId, createdBy: admin._id });
  }

  // Create a new shipment
  async createShipment(
    data: {
      senderName: string;
      receiverName: string;
      originPort: string;
      destination: string;
      currentLocation: string;
      weight: number;
      carrier?: string;
      shipmentDate: string;
      deliveryDate?: string;
    },
    adminId: string,
  ) {
    const trackingId = generateTrackingId();
    const shipment = await shipmentRepo.create({
      ...data,
      trackingId,
      shipmentDate: new Date(data.shipmentDate),
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
      createdBy: new mongoose.Types.ObjectId(adminId),
    });
    return shipment;
  }

  // Update shipment status
  async updateShipmentStatus(
    data: {
      trackingId: string;
      status: string;
      currentLocation: string;
    },
    admin: { _id: string; role: "SUPER_ADMIN" | "ADMIN" },
  ) {
    const filter: Record<string, unknown> = { trackingId: data.trackingId };

    if (admin.role !== "SUPER_ADMIN") {
      filter.createdBy = admin._id;
    }

    const shipment = await shipmentRepo.update(
      filter,
      { status: data.status, currentLocation: data.currentLocation },
    );

    return shipment;
  }
}

export default ShipmentService;
