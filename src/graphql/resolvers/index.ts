import authResolver from "./auth.resolver";
import shipmentResolver from "./shipment.resolver";
import trackingResolver from "./tracking.resolver";
import { formatDate } from "../../utils/formatDate";

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
    shipmentDate: (parent: any) => formatDate(parent.shipmentDate),
    deliveryDate: (parent: any) =>
      parent.deliveryDate ? formatDate(parent.deliveryDate) : null,
    createdAt: (parent: any) => formatDate(parent.createdAt),
    updatedAt: (parent: any) => formatDate(parent.updatedAt),
  },
  TrackingHistory: {
    date: (parent: any) => formatDate(parent.date),
    createdAt: (parent: any) => formatDate(parent.createdAt),
    updatedAt: (parent: any) => formatDate(parent.updatedAt),
  },
};

export default resolvers;
