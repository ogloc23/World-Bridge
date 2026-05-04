import TrackingService from "../../services/tracking.service";
import { Context } from "../../types/context";

const trackingService = new TrackingService();

const trackingResolver = {
  Query: {
    trackShipment: async (
      _: unknown,
      { trackingId }: { trackingId: string },
      context: Context,
    ) => {
      const result = await trackingService.trackShipment(trackingId);
      // Only return history if admin
      return {
        shipment: result.shipment,
        history: context.admin ? result.history : [],
      };
    },
  },
};

export default trackingResolver;
