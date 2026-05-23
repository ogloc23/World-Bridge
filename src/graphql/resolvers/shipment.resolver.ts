import ShipmentService from "../../services/shipment.service";
import TrackingService from "../../services/tracking.service";
import { Context } from "../../types/context";

interface CreateShipmentInput {
  senderName: string;
  receiverName: string;
  originPort: string;
  destination: string;
  currentLocation: string;
  weight: number;
  carrier?: string;
  shipmentDate: string;
  deliveryDate?: string;
}

const shipmentService = new ShipmentService();
const trackingService = new TrackingService();

const shipmentResolver = {
  Query: {
    shipments: async (_: unknown, __: unknown, context: Context) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      return shipmentService.getAllShipments(context.admin);
    },
    shipment: async (
      _: unknown,
      { trackingId }: { trackingId: string },
      context: Context,
    ) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      const shipment = await shipmentService.getShipmentByTrackingId(
        trackingId,
        context.admin,
      );

      if (!shipment) {
        throw new Error("Shipment not found or unauthorized");
      }

      return shipment;
    },
  },

  Mutation: {
    createShipment: async (
      _: unknown,
      { input }: { input: CreateShipmentInput },
      context: Context,
    ) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      const shipment = await shipmentService.createShipment(input, context.admin._id);
      if (shipment) {
        await trackingService.addTrackingHistory({
          shipmentId: shipment._id.toString(),
          location: shipment.currentLocation,
          status: shipment.status,
        });
      }
      return shipment;
    },
    updateShipmentStatus: async (
      _: unknown,
      {
        input,
      }: {
        input: { trackingId: string; status: string; currentLocation: string };
      },
      context: Context,
    ) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      const shipment = await shipmentService.updateShipmentStatus(
        input,
        context.admin,
      );

      if (!shipment) {
        throw new Error("Shipment not found or unauthorized");
      }

      await trackingService.addTrackingHistory({
        shipmentId: shipment._id.toString(),
        location: input.currentLocation,
        status: input.status,
      });
      return shipment;
    },
  },
};

export default shipmentResolver;
