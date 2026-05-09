export const shipmentTypeDefs = `#graphql
  enum ShipmentStatus {
    PENDING
    IN_TRANSIT
    ON_HOLD
    OUT_FOR_DELIVERY
    DELIVERED
    CANCELLED
  }

  type Shipment {
    id: ID!
    trackingId: String!
    senderName: String!
    receiverName: String!
    originPort: String!
    destination: String!
    currentLocation: String!
    status: ShipmentStatus!
    weight: Float
    carrier: String
    shipmentDate: String!
    deliveryDate: String
    eventLog: [TrackingHistory]
    createdAt: String
    updatedAt: String
  }

  type Query {
    shipments: [Shipment]
    shipment(trackingId: String!): Shipment
  }

  input CreateShipmentInput {
    senderName: String!
    receiverName: String!
    originPort: String!
    destination: String!
    currentLocation: String!
    weight: Float!
    carrier: String
    shipmentDate: String!
    deliveryDate: String
  }

  input UpdateShipmentStatusInput {
    trackingId: String!
    status: ShipmentStatus!
    currentLocation: String!
    deliveryDate: String
  }

  type Mutation {
    createShipment(input: CreateShipmentInput!): Shipment
    updateShipmentStatus(input: UpdateShipmentStatusInput!): Shipment
  }
`;
