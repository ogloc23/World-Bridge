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
      // Assuming auth is required
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      return shipmentService.getAllShipments();
    },
    shipment: async (
      _: unknown,
      { trackingId }: { trackingId: string },
      context: Context,
    ) => {
      if (!context.admin) {
        throw new Error("Not authenticated");
      }
      return shipmentService.getShipmentByTrackingId(trackingId);
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
      return shipmentService.createShipment(input);
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
      const shipment = await shipmentService.updateShipmentStatus(input);
      if (shipment) {
        // Optionally add to tracking history
        await trackingService.addTrackingHistory({
          shipmentId: shipment._id.toString(),
          location: input.currentLocation,
          status: input.status,
        });
      }
      return shipment;
    },
  },
};

export default shipmentResolver;
