// export const trackingHistoryTypeDefs = `#graphql
//   type TrackingHistory {
//     id: ID!
//     shipmentId: ID!
//     location: String!
//     status: String!
//     description: String
//     date: String!
//     createdAt: String
//     updatedAt: String
//   }

//   type Query {
//     trackingHistoryByShipment(shipmentId: ID!): [TrackingHistory]
//   }

//   input AddTrackingHistoryInput {
//     shipmentId: ID!
//     location: String!
//     status: String!
//     description: String
//   }

//   type Mutation {
//     addTrackingHistory(input: AddTrackingHistoryInput!): TrackingHistory
//   }
// `;


export const trackingHistoryTypeDefs = `#graphql

  type TrackingHistory {
    id: ID!
    shipmentId: ID!
    location: String!
    status: String!
    description: String
    date: String!
    createdAt: String
    updatedAt: String
  }

  type TrackingResponse {
    shipment: Shipment
    history: [TrackingHistory]
  }

  type Query {
    trackShipment(trackingId: String!): TrackingResponse
  }
`;