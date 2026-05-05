import authResolver from "./auth.resolver";
import shipmentResolver from "./shipment.resolver";
import trackingResolver from "./tracking.resolver";
import { formatDate } from "../../utils/formatDate";
import Shipment from "../../models/shipment";
import TrackingHistory from "../../models/trackingHistory";
import Admin from "../../models/admin";

const resolvers = {
  Query: {
    ...authResolver.Query,
    ...shipmentResolver.Query,
    ...trackingResolver.Query,
  },
  Mutation: {
    ...authResolver.Mutation,
    ...shipmentResolver.Mutation,
  },
  Shipment: {
    shipmentDate: (parent: InstanceType<typeof Shipment>) =>
      formatDate(parent.shipmentDate),
    deliveryDate: (parent: InstanceType<typeof Shipment>) =>
      parent.deliveryDate ? formatDate(parent.deliveryDate) : null,
    createdAt: (parent: InstanceType<typeof Shipment>) =>
      formatDate(parent.createdAt),
    updatedAt: (parent: InstanceType<typeof Shipment>) =>
      formatDate(parent.updatedAt),
  },
  TrackingHistory: {
    date: (parent: InstanceType<typeof TrackingHistory>) =>
      formatDate(parent.date),
    createdAt: (parent: InstanceType<typeof TrackingHistory>) =>
      formatDate(parent.createdAt),
    updatedAt: (parent: InstanceType<typeof TrackingHistory>) =>
      formatDate(parent.updatedAt),
  },
  Admin: {
    createdAt: (parent: InstanceType<typeof Admin>) =>
      formatDate(parent.createdAt),
    updatedAt: (parent: InstanceType<typeof Admin>) =>
      formatDate(parent.updatedAt),
  },
};

export default resolvers;
