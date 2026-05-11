import TrackingService from "../../services/tracking.service";
import { Context } from "../../types/context";

const trackingService = new TrackingService();

const trackingResolver = {
  Query: {
    trackShipment: async (
      _: unknown,
      { trackingId }: { trackingId: string },
    ) => {
      const result = await trackingService.trackShipment(trackingId);
      return result.shipment;
    },
  },
};

export default trackingResolver;
